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
  const fields =
    "id,message,story,created_time,permalink_url,full_picture,attachments{media{image{src}},subattachments{media{image{src}}},title,description}";
  const url = `https://graph.facebook.com/v22.0/${endpointPath}?fields=${encodeURIComponent(fields)}&limit=10`;

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
    let resolvedPageId = pageId && /^[A-Za-z0-9._-]+$/.test(pageId) ? pageId : "";
    let effectiveToken = accessToken;
    let rawItems: any[] = [];

    const primaryEdges: string[] = resolvedPageId
      ? [`${encodeURIComponent(resolvedPageId)}/posts`, `${encodeURIComponent(resolvedPageId)}/published_posts`]
      : ["me/posts", "me/published_posts"];

    const primaryResults = await Promise.all(
      primaryEdges.map((edge) => fetchGraphPostsEndpoint(edge, effectiveToken))
    );

    for (const r of primaryResults) {
      if (r.ok && r.data.length > 0) {
        rawItems.push(...r.data);
      }
    }

    if (rawItems.length === 0 && resolvedPageId && !primaryResults.some((r) => r.errorCode === 190)) {
      const meRes = await fetchGraphPostsEndpoint("me/posts", effectiveToken);
      if (meRes.ok && meRes.data.length > 0) {
        rawItems.push(...meRes.data);
      }
    }

    if (rawItems.length === 0) {
      const resolved = await resolvePageTokenFromUserToken(accessToken, pageId);
      if (resolved) {
        resolvedPageId = resolved.pageId;
        effectiveToken = resolved.pageToken;
        const retryResults = await Promise.all([
          fetchGraphPostsEndpoint(`${encodeURIComponent(resolvedPageId)}/posts`, effectiveToken),
          fetchGraphPostsEndpoint(`${encodeURIComponent(resolvedPageId)}/published_posts`, effectiveToken),
        ]);
        for (const r of retryResults) {
          if (r.ok && r.data.length > 0) {
            rawItems.push(...r.data);
          }
        }
      }
    }

    const seenIds = new Set<string>();
    const posts: FacebookPost[] = [];
    for (const item of rawItems) {
      const id = typeof item?.id === "string" ? item.id.trim() : "";
      if (!id || seenIds.has(id)) continue;

      const firstAttachment = Array.isArray(item?.attachments?.data) ? item.attachments.data[0] : null;
      const firstSubAttachment = Array.isArray(firstAttachment?.subattachments?.data)
        ? firstAttachment.subattachments.data[0]
        : null;

      const rawMessage =
        (typeof item?.message === "string" && item.message.trim()) ||
        (typeof item?.story === "string" && item.story.trim()) ||
        (typeof firstAttachment?.title === "string" && firstAttachment.title.trim()) ||
        (typeof firstAttachment?.description === "string" && firstAttachment.description.trim()) ||
        "";

      const imageUrl =
        toSafeHttpsUrl(item?.full_picture) ||
        toSafeHttpsUrl(firstAttachment?.media?.image?.src) ||
        toSafeHttpsUrl(firstSubAttachment?.media?.image?.src);

      if (!rawMessage && !imageUrl) continue;

      const permalinkUrl = toSafeHttpsUrl(item?.permalink_url) || FACEBOOK_PAGE_URL;
      const createdTime = typeof item?.created_time === "string" ? item.created_time : "";

      seenIds.add(id);
      posts.push({
        id,
        message: rawMessage || "New update on Unlock Education",
        createdTime,
        permalinkUrl,
        imageUrl,
      });
    }

    posts.sort((a, b) => {
      const ta = a.createdTime ? new Date(a.createdTime).getTime() : 0;
      const tb = b.createdTime ? new Date(b.createdTime).getTime() : 0;
      return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta);
    });

    const forceRefresh = req.query?.refresh === "1" || req.query?.refresh === "true";
    res.setHeader(
      "Cache-Control",
      forceRefresh || posts.length === 0
        ? "no-store"
        : "public, s-maxage=60, stale-while-revalidate=120"
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
