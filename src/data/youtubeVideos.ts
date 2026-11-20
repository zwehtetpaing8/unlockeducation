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
          title: 'Grade 12 Mathematics Chapter 9 | Part 1',
          published: '2026-11-20T04:01:02+00:00',
          thumbnail: thumb('5Jni4kvDo54'),
          playlistId: 'PLJtCmidavJSY',
          chapterId: 9,
        },
      ],
    },
  ],
  latestUploads: [
    {
      id: '5Jni4kvDo54',
      title: 'Grade 12 Mathematics Chapter 9 | Part 1',
      published: '2026-11-20T04:01:02+00:00',
      thumbnail: thumb('5Jni4kvDo54'),
      chapterId: 9,
    },
    {
      id: 'N6LxiNwh_cY',
      title: 'Grade 12 Mathematics Chapter 1 | Part 12',
      published: '2026-11-15T12:00:08+00:00',
      thumbnail: thumb('N6LxiNwh_cY'),
      chapterId: 1,
    },
    {
      id: 'QzOwpCIjSpw',
      title: 'Grade 12 Mathematics Chapter 1 Section A Questions and Solutions',
      published: '2026-11-10T11:30:00+00:00',
      thumbnail: thumb('QzOwpCIjSpw'),
      chapterId: 1,
    },
    {
      id: 'LlBZf990EsQ',
      title: 'Grade 12 Mathematics Chapter 1 Section 1.1',
      published: '2026-11-05T11:30:00+00:00',
      thumbnail: thumb('LlBZf990EsQ'),
      chapterId: 1,
    },
    {
      id: 'fz5lQmRiyJk',
      title: 'Grade 12 Mathematics Chapter 1 | Part 11',
      published: '2026-10-13T11:30:06+00:00',
      thumbnail: thumb('fz5lQmRiyJk'),
      chapterId: 1,
    },
    {
      id: 'PsamOiE7NHQ',
      title: 'Grade 12 Mathematics Chapter 1 | Part 10',
      published: '2026-10-04T09:00:25+00:00',
      thumbnail: thumb('PsamOiE7NHQ'),
      chapterId: 1,
    },
    {
      id: 'nnVIU3DvHRg',
      title: 'Unlock Education Online Learning Platform',
      published: '2026-11-18T10:00:00+00:00',
      thumbnail: thumb('nnVIU3DvHRg'),
      chapterId: null,
    },
  ],
};

let cachedLibrary: YoutubeLibraryData | null = null;
let cachedAt = 0;
let inflightRequest: Promise<YoutubeLibraryData> | null = null;
const CLIENT_CACHE_TTL_MS = 5 * 60 * 1000;

async function fetchYoutubeLibrary(forceRefresh = false): Promise<YoutubeLibraryData> {
  if (!forceRefresh && cachedLibrary && Date.now() - cachedAt < CLIENT_CACHE_TTL_MS) {
    return cachedLibrary;
  }

  if (!forceRefresh && inflightRequest) {
    return inflightRequest;
  }

  const req = fetch(`/api/youtube/videos${forceRefresh ? '?refresh=1' : ''}`)
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as YoutubeLibraryData;
      if (data && Array.isArray(data.playlists) && data.playlists.length > 0) {
        cachedLibrary = data;
        cachedAt = Date.now();
        return data;
      }
      return FALLBACK_YOUTUBE_LIBRARY;
    })
    .catch(() => cachedLibrary || FALLBACK_YOUTUBE_LIBRARY)
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
