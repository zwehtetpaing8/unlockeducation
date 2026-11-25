import { useState, useEffect, useCallback } from 'react';

export interface YoutubeVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  playlistId?: string;
  chapterId?: number | null;
}

export interface YoutubePlaylist {
  id: string;
  title: string;
  shortLabel: string;
  chapterId: number | null;
  playlistUrl: string;
  videos: YoutubeVideo[];
}

export interface YoutubeLibraryData {
  channelHandle: string;
  channelName: string;
  channelId: string;
  channelUrl: string;
  updatedAt: string;
  isLive: boolean;
  playlists: YoutubePlaylist[];
  latestUploads: YoutubeVideo[];
}

export const YOUTUBE_CHANNEL_HANDLE = '@UnlockEdu25';
export const YOUTUBE_CHANNEL_ID = 'UCRjeOhv_PQNoE8bJM26Ea9g';
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@UnlockEdu25';

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const FALLBACK_YOUTUBE_LIBRARY: YoutubeLibraryData = {
  channelHandle: YOUTUBE_CHANNEL_HANDLE,
  channelName: 'Unlock Education',
  channelId: YOUTUBE_CHANNEL_ID,
  channelUrl: YOUTUBE_CHANNEL_URL,
  updatedAt: '2026-11-20T00:00:00Z',
  isLive: false,
  playlists: [
    {
      id: 'PLSJTOXTAyfjg',
      title: 'Grade 12 Mathematics Chapter 1',
      shortLabel: 'Chapter 1',
      chapterId: 1,
      playlistUrl: 'https://www.youtube.com/playlist?list=PLSJTOXTAyfjg',
      videos: [
        {
          id: 'ak7e_qXVNWQ',
          title: 'Grade 12 Mathematics Chapter 1 | Part 1',
          published: '2026-09-01T14:20:09+00:00',
          thumbnail: thumb('ak7e_qXVNWQ'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'jvoBCJQCHq0',
          title: 'Grade 12 Mathematics Chapter 1 | Part 2',
          published: '2026-09-03T13:20:07+00:00',
          thumbnail: thumb('jvoBCJQCHq0'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'hDlQr9adnwY',
          title: 'Grade 12 Mathematics Chapter 1 | Part 3',
          published: '2026-09-04T15:09:49+00:00',
          thumbnail: thumb('hDlQr9adnwY'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'nM62tN55SNU',
          title: 'Grade 12 Mathematics Chapter 1 | Part 4',
          published: '2026-09-06T12:15:10+00:00',
          thumbnail: thumb('nM62tN55SNU'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'KN7uJbA1ypo',
          title: 'Grade 12 Mathematics Chapter 1 | Part 5',
          published: '2026-09-09T11:30:10+00:00',
          thumbnail: thumb('KN7uJbA1ypo'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'epEUC6f_J9Q',
          title: 'Grade 12 Mathematics Chapter 1 | Part 6',
          published: '2026-09-12T10:30:06+00:00',
          thumbnail: thumb('epEUC6f_J9Q'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'plAYoFNacnw',
          title: 'Grade 12 Mathematics Chapter 1 | Part 7',
          published: '2026-09-17T06:00:50+00:00',
          thumbnail: thumb('plAYoFNacnw'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'EsZWuRwmOB4',
          title: 'Grade 12 Mathematics Chapter 1 | Part 8',
          published: '2026-09-20T12:00:07+00:00',
          thumbnail: thumb('EsZWuRwmOB4'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'BVAb0iZZTJM',
          title: 'Grade 12 Mathematics Chapter 1 | Part 9',
          published: '2026-09-23T15:30:06+00:00',
          thumbnail: thumb('BVAb0iZZTJM'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'PsamOiE7NHQ',
          title: 'Grade 12 Mathematics Chapter 1 | Part 10',
          published: '2026-10-04T09:00:25+00:00',
          thumbnail: thumb('PsamOiE7NHQ'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'fz5lQmRiyJk',
          title: 'Grade 12 Mathematics Chapter 1 | Part 11',
          published: '2026-10-13T11:30:06+00:00',
          thumbnail: thumb('fz5lQmRiyJk'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
        {
          id: 'N6LxiNwh_cY',
          title: 'Grade 12 Mathematics Chapter 1 | Part 12',
          published: '2026-11-15T12:00:08+00:00',
          thumbnail: thumb('N6LxiNwh_cY'),
          playlistId: 'PLSJTOXTAyfjg',
          chapterId: 1,
        },
      ],
    },
    {
      id: 'PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB',
      title: 'Grade 12 Mathematics Chapter 3',
      shortLabel: 'Chapter 3',
      chapterId: 3,
      playlistUrl:
        'https://www.youtube.com/playlist?list=PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB',
      videos: [
        {
          id: 'LxcUqUgplFI',
          title: 'Grade 12 Mathematics Chapter 3 | Part 01',
          published: '2026-02-02T11:02:13+00:00',
          thumbnail: thumb('LxcUqUgplFI'),
          playlistId: 'PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB',
          chapterId: 3,
        },
        {
          id: 'L9Jnzdzx5og',
          title: 'Grade 12 Mathematics Chapter 3 | Part 02',
          published: '2026-02-06T12:12:41+00:00',
          thumbnail: thumb('L9Jnzdzx5og'),
          playlistId: 'PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB',
          chapterId: 3,
        },
        {
          id: 'rkUb4EYs13g',
          title: 'Grade 12 Mathematics Chapter 3 | Part 03',
          published: '2026-02-08T11:00:35+00:00',
          thumbnail: thumb('rkUb4EYs13g'),
          playlistId: 'PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB',
          chapterId: 3,
        },
        {
          id: 'VaeRARv9jhk',
          title: 'Grade 12 Mathematics Chapter 3 | Part 04',
          published: '2026-02-11T12:00:46+00:00',
          thumbnail: thumb('VaeRARv9jhk'),
          playlistId: 'PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB',
          chapterId: 3,
        },
        {
          id: 'CJPmbV05YpY',
          title: 'Grade 12 Mathematics Chapter 3 | Part 05',
          published: '2026-02-13T11:00:48+00:00',
          thumbnail: thumb('CJPmbV05YpY'),
          playlistId: 'PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB',
          chapterId: 3,
        },
        {
          id: 'Njrsk4bHiKA',
          title: 'Grade 12 Mathematics Chapter 3 | Part 06',
          published: '2026-02-17T11:01:02+00:00',
          thumbnail: thumb('Njrsk4bHiKA'),
          playlistId: 'PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB',
          chapterId: 3,
        },
        {
          id: 'MP8Hsp69mvI',
          title: 'Grade 12 Mathematics Chapter 3 | Part 07',
          published: '2026-02-21T11:00:37+00:00',
          thumbnail: thumb('MP8Hsp69mvI'),
          playlistId: 'PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB',
          chapterId: 3,
        },
        {
          id: 'iizOB7whlqE',
          title: 'Grade 12 Mathematics Chapter 3 | Part 08',
          published: '2026-02-27T12:00:54+00:00',
          thumbnail: thumb('iizOB7whlqE'),
          playlistId: 'PLVopMG9bjvM6G9jgqXtSAfFsPBoe2cFPB',
          chapterId: 3,
        },
      ],
    },
    {
      id: 'PLJtCmidavJSY',
      title: 'Grade 12 Mathematics Chapter 9',
      shortLabel: 'Chapter 9',
      chapterId: 9,
      playlistUrl: 'https://www.youtube.com/playlist?list=PLJtCmidavJSY',
      videos: [
        {
          id: '5Jni4kvDo54',
          title: 'Grade 12 Mathematics Chapter 9 Part 1',
          published: '2026-11-20T07:17:18+00:00',
          thumbnail: thumb('5Jni4kvDo54'),
          playlistId: 'PLJtCmidavJSY',
          chapterId: 9,
        },
        {
          id: 'w7dJxzPQC4s',
          title: 'Grade 12 Mathematics Chapter 9 Part 2',
          published: '2026-11-23T00:45:43+00:00',
          thumbnail: thumb('w7dJxzPQC4s'),
          playlistId: 'PLJtCmidavJSY',
          chapterId: 9,
        },
      ],
    },
  ],
  latestUploads: [
    {
      id: 'w7dJxzPQC4s',
      title: 'Grade 12 Mathematics Chapter 9 Part 2',
      published: '2026-11-23T00:45:43+00:00',
      thumbnail: thumb('w7dJxzPQC4s'),
      chapterId: 9,
    },
    {
      id: '5Jni4kvDo54',
      title: 'Grade 12 Mathematics Chapter 9 Part 1',
      published: '2026-11-20T07:17:18+00:00',
      thumbnail: thumb('5Jni4kvDo54'),
      chapterId: 9,
    },
    {
      id: 'nnVIU3DvHRg',
      title: 'Unlock Education Online Learning Platform',
      published: '2026-11-19T15:04:47+00:00',
      thumbnail: thumb('nnVIU3DvHRg'),
      chapterId: null,
    },
    {
      id: 'N6LxiNwh_cY',
      title: 'Grade 12 Mathematics Chapter 1 Part 12',
      published: '2026-11-15T15:17:21+00:00',
      thumbnail: thumb('N6LxiNwh_cY'),
      chapterId: 1,
    },
    {
      id: 'fz5lQmRiyJk',
      title: 'Grade 12 Mathematics Chapter 1 Part 11',
      published: '2026-10-13T15:28:28+00:00',
      thumbnail: thumb('fz5lQmRiyJk'),
      chapterId: 1,
    },
    {
      id: 'QzOwpCIjSpw',
      title: 'Grade 12 Mathematics Chapter 1 Section A Questions and Solutions',
      published: '2026-10-13T06:00:48+00:00',
      thumbnail: thumb('QzOwpCIjSpw'),
      chapterId: 1,
    },
    {
      id: 'PsamOiE7NHQ',
      title: 'Grade 12 Mathematics Chapter 1 Part 10',
      published: '2026-10-04T05:42:53+00:00',
      thumbnail: thumb('PsamOiE7NHQ'),
      chapterId: 1,
    },
  ],
};

let cachedLibrary: YoutubeLibraryData | null = null;
let cachedAt = 0;
let inflightRequest: Promise<YoutubeLibraryData> | null = null;
const CLIENT_CACHE_TTL_MS = 2 * 60 * 1000;

function extractChapterIdClient(title: string): number | null {
  const match = title.match(/(?:chapter|ch\.?)\s*0*(\d{1,2})\b/i);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  return num >= 1 && num <= 11 ? num : null;
}

function extractPartNumberClient(title: string): number | null {
  const match = title.match(/(?:part|lesson|ep\.?|episode)\s*0*(\d{1,3})\b/i);
  return match ? parseInt(match[1], 10) : null;
}

function parseYoutubeIdFromRssItem(item: { guid?: string; link?: string }): string | null {
  const guidMatch = item.guid?.match(/yt:video:([A-Za-z0-9_-]{11})/);
  if (guidMatch) return guidMatch[1];
  const linkMatch = item.link?.match(/[?&]v=([A-Za-z0-9_-]{11})|\/shorts\/([A-Za-z0-9_-]{11})/);
  return linkMatch?.[1] || linkMatch?.[2] || null;
}

async function fetchViaPublicRssFallback(): Promise<YoutubeLibraryData | null> {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.status !== 'ok' || !Array.isArray(json.items) || json.items.length === 0) {
      return null;
    }

    const liveLatest: YoutubeVideo[] = [];
    for (const item of json.items) {
      const id = parseYoutubeIdFromRssItem(item);
      if (!id) continue;
      const title = String(item.title || 'Untitled Video').trim();
      const pubRaw = String(item.pubDate || '').trim();
      const published = pubRaw && !pubRaw.includes('T') ? `${pubRaw.replace(' ', 'T')}Z` : pubRaw;
      liveLatest.push({
        id,
        title,
        published,
        thumbnail: thumb(id),
        chapterId: extractChapterIdClient(title),
      });
    }

    if (liveLatest.length === 0) return null;

    // Clone fallback playlists and merge any newly uploaded Grade 12 chapter videos into matching playlists
    const playlists: YoutubePlaylist[] = FALLBACK_YOUTUBE_LIBRARY.playlists.map((pl) => ({
      ...pl,
      videos: [...pl.videos],
    }));

    for (const v of liveLatest) {
      if (v.chapterId && /grade\s*12|g\s*12/i.test(v.title) && extractPartNumberClient(v.title) !== null) {
        const target = playlists.find((pl) => pl.chapterId === v.chapterId);
        if (target && !target.videos.some((pv) => pv.id === v.id)) {
          target.videos.push({ ...v, playlistId: target.id });
          target.videos.sort((a, b) => {
            const pa = extractPartNumberClient(a.title);
            const pb = extractPartNumberClient(b.title);
            if (pa !== null && pb !== null && pa !== pb) return pa - pb;
            return new Date(a.published || 0).getTime() - new Date(b.published || 0).getTime();
          });
        }
      }
    }

    return {
      ...FALLBACK_YOUTUBE_LIBRARY,
      updatedAt: new Date().toISOString(),
      isLive: true,
      playlists,
      latestUploads: liveLatest,
    };
  } catch {
    return null;
  }
}

async function fetchYoutubeLibrary(forceRefresh = false): Promise<YoutubeLibraryData> {
  if (!forceRefresh && cachedLibrary && Date.now() - cachedAt < CLIENT_CACHE_TTL_MS) {
    return cachedLibrary;
  }

  if (!forceRefresh && inflightRequest) {
    return inflightRequest;
  }

  const query = forceRefresh ? `?refresh=1&t=${Date.now()}` : '';
  const req = fetch(`/api/youtube/videos${query}`, { cache: 'no-store' })
    .then(async (res) => {
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as YoutubeLibraryData;
      if (data && Array.isArray(data.playlists) && data.playlists.length > 0) {
        cachedLibrary = data;
        cachedAt = Date.now();
        return data;
      }
      throw new Error('Empty payload');
    })
    .catch(async () => {
      const rssFallback = await fetchViaPublicRssFallback();
      if (rssFallback) {
        cachedLibrary = rssFallback;
        cachedAt = Date.now();
        return rssFallback;
      }
      return cachedLibrary || FALLBACK_YOUTUBE_LIBRARY;
    })
    .finally(() => {
      inflightRequest = null;
    });

  inflightRequest = req;
  return req;
}

export function useYoutubeVideos() {
  const [library, setLibrary] = useState<YoutubeLibraryData>(
    () => cachedLibrary || FALLBACK_YOUTUBE_LIBRARY
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    fetchYoutubeLibrary(false).then((data) => {
      if (active) setLibrary(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchYoutubeLibrary(true);
      setLibrary(data);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return { library, isRefreshing, refresh };
}

export function getChapterPlaylist(
  library: YoutubeLibraryData,
  chapterId: number
): YoutubePlaylist | undefined {
  return library.playlists.find((pl) => pl.chapterId === chapterId);
}

export function formatYoutubeDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
