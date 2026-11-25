const FACEBOOK_PAGE_URL = "https://www.facebook.com/UnlockEducation25";
const FACEBOOK_PAGE_HANDLE = "@UnlockEducation25";

interface FacebookPost {
  id: string;
  message: string;
  createdTime: string;
  permalinkUrl: string;
  imageUrl: string | null;
}

interface FacebookFeedData {
  configured: boolean;
  pageName: string;
  pageHandle: string;
  pageUrl: string;
  updatedAt: string;
  posts: FacebookPost[];
}

function cleanEnvSecret(value: string | undefined): string {
  return (value || "").trim().replace(/^["']+|["']+$/g, "").trim();
}

function toSafeHttpsUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

async function fetchGraphPostsEndpoint(
  endpointPath: string,
  accessToken: string
): Promise<{ ok: boolean; errorCode?: number; data: any[] }> {
  const fields = "id,message,story,created_time,permalink_url,full_picture";
  const url = `https://graph.facebook.com/v22.0/${endpointPath}?fields=${encodeURIComponent(fields)}&limit=6`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    const payload = (await response.json().catch(() => ({}))) as {
      data?: any[];
      error?: { code?: number };
    };

    if (!response.ok) {
      return {
        ok: false,
        errorCode: payload?.error?.code,
        data: [],
      };
    }

    return {
      ok: true,
      data: Array.isArray(payload?.data) ? payload.data : [],
    };
  } finally {
    clearTimeout(timer);
  }
}

async function resolvePageTokenFromUserToken(
  userToken: string,
  preferredPageId: string
): Promise<{ pageId: string; pageToken: string } | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch("https://graph.facebook.com/v22.0/me/accounts?fields=id,name,access_token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const payload = (await res.json().catch(() => ({}))) as {
      data?: Array<{ id?: string; access_token?: string }>;
    };
    const accounts = Array.isArray(payload?.data) ? payload.data : [];
    const matched =
      accounts.find((acc) => acc?.id && acc.id === preferredPageId && acc.access_token) ||
      accounts.find((acc) => acc?.id && acc?.access_token);
    if (matched?.id && matched?.access_token) {
      return { pageId: matched.id, pageToken: matched.access_token };
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const pageId = cleanEnvSecret(process.env.FACEBOOK_PAGE_ID);
  const accessToken = cleanEnvSecret(process.env.FACEBOOK_PAGE_ACCESS_TOKEN);

  if (!accessToken) {
    res.setHeader("Cache-Control", "no-store");
    const empty: FacebookFeedData = {
      configured: false,
      pageName: "Unlock Education",
      pageHandle: FACEBOOK_PAGE_HANDLE,
      pageUrl: FACEBOOK_PAGE_URL,
      updatedAt: new Date().toISOString(),
      posts: [],
    };
    return res.status(200).json(empty);
  }

  try {
    const candidateEndpoints: string[] = [];
    if (pageId && /^[A-Za-z0-9._-]+$/.test(pageId)) {
      candidateEndpoints.push(`${encodeURIComponent(pageId)}/posts`);
    }
    candidateEndpoints.push("me/posts");

    let rawItems: any[] = [];

    for (const endpoint of candidateEndpoints) {
      const result = await fetchGraphPostsEndpoint(endpoint, accessToken);
      if (result.ok && result.data.length > 0) {
        rawItems = result.data;
        break;
      }
      if (!result.ok && result.errorCode === 190) {
        break;
      }
    }

    if (rawItems.length === 0) {
      const resolved = await resolvePageTokenFromUserToken(accessToken, pageId);
      if (resolved) {
        const retry = await fetchGraphPostsEndpoint(
          `${encodeURIComponent(resolved.pageId)}/posts`,
          resolved.pageToken
        );
        if (retry.ok && retry.data.length > 0) {
          rawItems = retry.data;
        }
      }
    }

    const posts: FacebookPost[] = [];
    for (const item of rawItems) {
      const id = typeof item?.id === "string" ? item.id.trim() : "";
      if (!id) continue;

      const rawMessage =
        (typeof item?.message === "string" && item.message.trim()) ||
        (typeof item?.story === "string" && item.story.trim()) ||
        "";

      const imageUrl = toSafeHttpsUrl(item?.full_picture);
      if (!rawMessage && !imageUrl) continue;

      const permalinkUrl = toSafeHttpsUrl(item?.permalink_url) || FACEBOOK_PAGE_URL;
      const createdTime = typeof item?.created_time === "string" ? item.created_time : "";

      posts.push({
        id,
        message: rawMessage || "New update on Unlock Education",
        createdTime,
        permalinkUrl,
        imageUrl,
      });
    }

    const forceRefresh = req.query?.refresh === "1" || req.query?.refresh === "true";
    res.setHeader(
      "Cache-Control",
      forceRefresh || posts.length === 0
        ? "no-store"
        : "public, s-maxage=300, stale-while-revalidate=600"
    );

    const feed: FacebookFeedData = {
      configured: true,
      pageName: "Unlock Education",
      pageHandle: FACEBOOK_PAGE_HANDLE,
      pageUrl: FACEBOOK_PAGE_URL,
      updatedAt: new Date().toISOString(),
      posts: posts.slice(0, 6),
    };

    return res.status(200).json(feed);
  } catch {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({
      configured: true,
      pageName: "Unlock Education",
      pageHandle: FACEBOOK_PAGE_HANDLE,
      pageUrl: FACEBOOK_PAGE_URL,
      updatedAt: new Date().toISOString(),
      posts: [],
    } satisfies FacebookFeedData);
  }
}
