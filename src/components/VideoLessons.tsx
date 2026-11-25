import { useState, useEffect, useMemo } from 'react';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Youtube,
  BookOpen,
  ListVideo,
  Search,
} from 'lucide-react';
import {
  useYoutubeVideos,
  formatYoutubeDate,
  YoutubePlaylist,
  YoutubeVideo,
} from '../data/youtubeVideos';

interface VideoLessonsProps {
  /** When provided, displays the video player scoped to this chapter's playlist */
  chapterId?: number;
  /** Optional chapter title for empty-state context */
  chapterTitle?: string;
  /** Initial playlist or video to highlight in full-page mode */
  initialPlaylistId?: string;
  initialVideoId?: string;
  /** Jump to full Video Lessons page (used in embedded chapter mode) */
  onOpenAllVideos?: () => void;
  /** Jump to the matching Syllabus chapter notes (used in full-page mode) */
  onSelectChapter?: (chapterId: number) => void;
}

const LATEST_TAB_ID = '__latest__';

export default function VideoLessons({
  chapterId,
  chapterTitle,
  initialPlaylistId,
  initialVideoId,
  onOpenAllVideos,
  onSelectChapter,
}: VideoLessonsProps) {
  const { library, isRefreshing, refresh } = useYoutubeVideos();
  const isChapterScoped = typeof chapterId === 'number';

  const tabs = useMemo(() => {
    const allTabs: Array<{
      id: string;
      label: string;
      title: string;
      chapterId: number | null;
      playlistUrl: string;
      videos: YoutubeVideo[];
    }> = [];

    if (library.latestUploads.length > 0) {
      allTabs.push({
        id: LATEST_TAB_ID,
        label: 'Latest Uploads',
        title: 'Latest Channel Uploads',
        chapterId: null,
        playlistUrl: `${library.channelUrl}/videos`,
        videos: library.latestUploads,
      });
    }

    for (const pl of library.playlists) {
      allTabs.push({
        id: pl.id,
        label: pl.shortLabel,
        title: pl.title,
        chapterId: pl.chapterId,
        playlistUrl: pl.playlistUrl,
        videos: pl.videos,
      });
    }

    return allTabs;
  }, [library]);

  const chapterPlaylist: YoutubePlaylist | undefined = useMemo(() => {
    if (!isChapterScoped) return undefined;
    return library.playlists.find((pl) => pl.chapterId === chapterId);
  }, [isChapterScoped, library.playlists, chapterId]);

  const [activeTabId, setActiveTabId] = useState<string>(() => {
    if (initialPlaylistId) return initialPlaylistId;
    return library.latestUploads.length > 0
      ? LATEST_TAB_ID
      : library.playlists[0]?.id || LATEST_TAB_ID;
  });

  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(
    initialVideoId || null
  );
  const [hasUserPickedVideo, setHasUserPickedVideo] = useState<boolean>(
    Boolean(initialVideoId)
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync when initialPlaylistId / initialVideoId changes from parent navigation
  useEffect(() => {
    if (initialPlaylistId && tabs.some((t) => t.id === initialPlaylistId)) {
      setActiveTabId(initialPlaylistId);
    }
    if (initialVideoId) {
      setSelectedVideoId(initialVideoId);
      setHasUserPickedVideo(true);
    }
  }, [initialPlaylistId, initialVideoId, tabs]);

  // Keep activeTabId valid when library updates
  useEffect(() => {
    if (!isChapterScoped && tabs.length > 0 && !tabs.some((t) => t.id === activeTabId)) {
      setActiveTabId(tabs[0].id);
    }
  }, [isChapterScoped, tabs, activeTabId]);

  // Determine active playlist/feed and videos list
  const activeCollection = useMemo(() => {
    if (isChapterScoped) {
      return chapterPlaylist
        ? {
            id: chapterPlaylist.id,
            label: chapterPlaylist.shortLabel,
            title: chapterPlaylist.title,
            chapterId: chapterPlaylist.chapterId,
            playlistUrl: chapterPlaylist.playlistUrl,
            videos: chapterPlaylist.videos,
          }
        : null;
    }
    return tabs.find((t) => t.id === activeTabId) || tabs[0] || null;
  }, [isChapterScoped, chapterPlaylist, tabs, activeTabId]);

  const videos: YoutubeVideo[] = activeCollection?.videos || [];

  // Ensure a valid video is selected whenever the active collection changes or live sync delivers a newer upload
  useEffect(() => {
    if (videos.length === 0) {
      setSelectedVideoId(null);
      return;
    }
    if (
      !selectedVideoId ||
      !videos.some((v) => v.id === selectedVideoId) ||
      (!hasUserPickedVideo && activeCollection?.id === LATEST_TAB_ID && selectedVideoId !== videos[0].id)
    ) {
      setSelectedVideoId(videos[0].id);
    }
  }, [videos, selectedVideoId, hasUserPickedVideo, activeCollection?.id]);

  const filteredVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return videos;
    return videos.filter((v) => v.title.toLowerCase().includes(q));
  }, [videos, searchQuery]);

  const activeIndex = Math.max(
    0,
    videos.findIndex((v) => v.id === selectedVideoId)
  );
  const activeVideo = videos[activeIndex] || videos[0] || null;

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < videos.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      setHasUserPickedVideo(true);
      setSelectedVideoId(videos[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setHasUserPickedVideo(true);
      setSelectedVideoId(videos[activeIndex + 1].id);
    }
  };

  // Embedded Chapter Mode: clean empty state if this chapter has no YouTube playlist yet
  if (isChapterScoped && (!activeCollection || videos.length === 0)) {
    const availableChaptersLabel = library.playlists
      .map((pl) => pl.shortLabel)
      .join(', ');

    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-2xl p-8 md:p-10 text-center space-y-5 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center mx-auto">
          <ListVideo className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="font-display font-bold text-base md:text-lg text-slate-900 dark:text-white">
            Chapter {chapterId} Video Lessons Coming Soon
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {chapterTitle
              ? `Videos for ${chapterTitle} will appear here automatically once uploaded to ${library.channelHandle}.`
              : `Videos for Chapter ${chapterId} will appear here automatically once uploaded to ${library.channelHandle}.`}
          </p>
          {availableChaptersLabel && (
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Available now: <span className="font-semibold text-slate-700 dark:text-slate-300">{availableChaptersLabel}</span>
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          {onOpenAllVideos && (
            <button
              onClick={onOpenAllVideos}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Browse All Video Lessons
            </button>
          )}
          <a
            href={library.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <Youtube className="w-4 h-4 text-[#FF0000]" />
            Visit {library.channelHandle}
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    );
  }

  if (!activeCollection || !activeVideo) {
    return null;
  }

  const isRealPlaylist = activeCollection.id !== LATEST_TAB_ID;
  const embedSrc = `https://www.youtube.com/embed/${activeVideo.id}?rel=0&playsinline=1`;
  const youtubeWatchUrl = isRealPlaylist
    ? `https://www.youtube.com/watch?v=${activeVideo.id}&list=${activeCollection.id}`
    : `https://www.youtube.com/watch?v=${activeVideo.id}`;

  const totalCourseVideos = library.playlists.reduce(
    (sum, pl) => sum + pl.videos.length,
    0
  );

  return (
    <div className="space-y-5">
      {/* Full-Page Header & Playlist Selector */}
      {!isChapterScoped && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight">
                Video Lessons
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                {library.channelHandle} · Grade 12 Mathematics ·{' '}
                <span className="tabular-nums font-medium text-slate-700 dark:text-slate-300">
                  {totalCourseVideos} lessons
                </span>{' '}
                across{' '}
                <span className="tabular-nums font-medium text-slate-700 dark:text-slate-300">
                  {library.playlists.length} playlists
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setHasUserPickedVideo(false);
                  refresh();
                }}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0"
                title="Sync latest videos from @UnlockEdu25"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
                />
                <span>{isRefreshing ? 'Syncing…' : 'Sync Channel'}</span>
              </button>

              <a
                href={library.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <Youtube className="w-4 h-4 text-[#FF0000]" />
                <span>YouTube Channel</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Playlist Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => {
              const isSelected = tab.id === activeCollection.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTabId(tab.id);
                    setHasUserPickedVideo(false);
                    setSearchQuery('');
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] font-mono tabular-nums ${
                      isSelected
                        ? 'text-indigo-100'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {tab.videos.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Two-Zone Course Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Zone 1: Active Video Player + Lesson Details (8 cols) */}
        <div className="lg:col-span-8 space-y-3.5 min-w-0">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <iframe
              key={`${activeVideo.id}-${activeCollection.id}`}
              src={embedSrc}
              title={activeVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Lesson Title, Metadata & Controls */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-2xl p-4 md:p-5 space-y-4">
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-0.5 tabular-nums">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {activeCollection.title}
                </span>
                <span>·</span>
                <span>
                  Lesson {activeIndex + 1} of {videos.length}
                </span>
                {activeVideo.published && (
                  <>
                    <span>·</span>
                    <span>{formatYoutubeDate(activeVideo.published)}</span>
                  </>
                )}
              </div>

              <h3 className="font-display font-bold text-base md:text-lg text-slate-900 dark:text-white leading-snug">
                {activeVideo.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={!canGoPrev}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Next Lesson
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {!isChapterScoped &&
                  activeCollection.chapterId &&
                  [1, 2, 3, 4, 5].includes(activeCollection.chapterId) &&
                  onSelectChapter && (
                    <button
                      onClick={() => onSelectChapter(activeCollection.chapterId!)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Open Chapter {activeCollection.chapterId} Notes
                    </button>
                  )}

                {isChapterScoped && onOpenAllVideos && (
                  <button
                    onClick={onOpenAllVideos}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ListVideo className="w-3.5 h-3.5" />
                    All Playlists
                  </button>
                )}

                <a
                  href={youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                  Watch on YouTube
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Zone 2: Playlist Queue Sidebar (4 cols) */}
        <aside className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col max-h-[600px]">
          <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 space-y-2.5 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white truncate">
                  {activeCollection.label} Queue
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                  {activeIndex + 1} / {videos.length} lessons · {library.channelHandle}
                </p>
              </div>
              <a
                href={activeCollection.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                Playlist
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {videos.length > 6 && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter lessons..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/70 p-2 space-y-1">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => {
                const lessonNum = videos.findIndex((v) => v.id === video.id) + 1;
                const isActive = video.id === activeVideo.id;
                return (
                    <button
                      key={video.id}
                      onClick={() => {
                        setHasUserPickedVideo(true);
                        setSelectedVideoId(video.id);
                      }}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/70'
                        : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span
                      className={`w-5 text-center text-[11px] font-mono font-bold tabular-nums shrink-0 ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {String(lessonNum).padStart(2, '0')}
                    </span>

                    <div className="relative w-24 aspect-video rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-indigo-950/45 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p
                        className={`text-xs leading-snug line-clamp-2 ${
                          isActive
                            ? 'font-bold text-indigo-900 dark:text-indigo-200'
                            : 'font-semibold text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {video.title}
                      </p>
                      {video.published && (
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 tabular-nums">
                          {formatYoutubeDate(video.published)}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-10 text-center text-xs text-slate-400">
                No lessons match "{searchQuery}"
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
