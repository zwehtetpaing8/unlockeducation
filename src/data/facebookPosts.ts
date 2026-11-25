import { useEffect, useState, useCallback } from 'react';

export interface FacebookPost {
  id: string;
  message: string;
  createdTime: string;
  permalinkUrl: string;
  imageUrl: string | null;
}

export interface FacebookFeedData {
  configured: boolean;
  pageName: string;
  pageHandle: string;
  pageUrl: string;
  updatedAt: string;
  posts: FacebookPost[];
}

export const FACEBOOK_PAGE_URL = 'https://www.facebook.com/UnlockEducation25';
export const FACEBOOK_PAGE_HANDLE = '@UnlockEducation25';

const EMPTY_FACEBOOK_FEED: FacebookFeedData = {
  configured: false,
  pageName: 'Unlock Education',
  pageHandle: FACEBOOK_PAGE_HANDLE,
  pageUrl: FACEBOOK_PAGE_URL,
  updatedAt: '',
  posts: [],
};

let cachedFacebookFeed: FacebookFeedData | null = null;
let inFlightFacebookRequest: Promise<FacebookFeedData> | null = null;

async function fetchFacebookFeed(forceRefresh = false): Promise<FacebookFeedData> {
  if (!forceRefresh && cachedFacebookFeed) {
    return cachedFacebookFeed;
  }
  if (!forceRefresh && inFlightFacebookRequest) {
    return inFlightFacebookRequest;
  }

  const endpoint = forceRefresh ? '/api/facebook/posts?refresh=1' : '/api/facebook/posts';
  const req = fetch(endpoint, { cache: 'no-store' })
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as FacebookFeedData;
      if (data && Array.isArray(data.posts)) {
        cachedFacebookFeed = data;
        return data;
      }
      return EMPTY_FACEBOOK_FEED;
    })
    .catch(() => cachedFacebookFeed || EMPTY_FACEBOOK_FEED)
    .finally(() => {
      inFlightFacebookRequest = null;
    });

  inFlightFacebookRequest = req;
  return req;
}

export function useFacebookPosts() {
  const [feed, setFeed] = useState<FacebookFeedData>(cachedFacebookFeed || EMPTY_FACEBOOK_FEED);
  const [isLoading, setIsLoading] = useState<boolean>(!cachedFacebookFeed);

  useEffect(() => {
    let active = true;
    fetchFacebookFeed(false).then((data) => {
      if (active) {
        setFeed(data);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchFacebookFeed(true);
    setFeed(data);
    setIsLoading(false);
  }, []);

  return { feed, isLoading, refresh };
}

export function formatFacebookDate(isoDate: string): string {
  if (!isoDate) return '';
  const dt = new Date(isoDate);
  if (Number.isNaN(dt.getTime())) return '';
  return dt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
