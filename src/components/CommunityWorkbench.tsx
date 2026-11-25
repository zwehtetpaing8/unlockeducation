import { useMemo, useRef, useState, type TouchEvent } from 'react';
import {
  Youtube,
  Facebook,
  PlayCircle,
  ExternalLink,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Send,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  useYoutubeVideos,
  formatYoutubeDate,
  type YoutubeVideo,
} from '../data/youtubeVideos';
import {
  useFacebookPosts,
  formatFacebookDate,
  type FacebookPost,
} from '../data/facebookPosts';

type SourceFilter = 'all' | 'youtube' | 'facebook';

type StageWindowItem =
  | {
      key: string;
      source: 'youtube';
      timestamp: number;
      dateLabel: string;
      title: string;
      subtitle: string;
      thumbnail: string | null;
      url: string;
      video: YoutubeVideo;
      targetPlaylistId: string;
    }
  | {
      key: string;
      source: 'facebook';
      timestamp: number;
      dateLabel: string;
      title: string;
      subtitle: string;
      thumbnail: string | null;
      url: string;
      post: FacebookPost;
    };

interface CommunityWorkbenchProps {
  onSelectChapter: (id: number) => void;
  onNavigateToVideos: (playlistId?: string, videoId?: string) => void;
}

function parseTimestamp(iso: string): number {
  if (!iso) return 0;
  const ts = new Date(iso).getTime();
  return Number.isNaN(ts) ? 0 : ts;
}

function getFacebookTitle(message: string): string {
  const firstLine = message
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean);
  if (!firstLine) return 'Unlock Education Update';
  return firstLine.length > 88 ? `${firstLine.slice(0, 85)}...` : firstLine;
}

export default function CommunityWorkbench({
  onSelectChapter,
  onNavigateToVideos,
}: CommunityWorkbenchProps) {
  const {
    library: youtubeLibrary,
    isRefreshing: ytRefreshing,
    refresh: refreshYoutube,
  } = useYoutubeVideos();
  const {
    feed: facebookFeed,
    isLoading: fbLoading,
    refresh: refreshFacebook,
  } = useFacebookPosts();

  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [userSelectedKey, setUserSelectedKey] = useState<string | null>(null);
  const [isPlayingInline, setIsPlayingInline] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const stageRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const allItems = useMemo<StageWindowItem[]>(() => {
    const nowMs = Date.now();
    const ytItems: StageWindowItem[] = youtubeLibrary.latestUploads
      .slice(0, 6)
      .map((video, index) => {
        const matchedPlaylist = video.chapterId
          ? youtubeLibrary.playlists.find((pl) => pl.chapterId === video.chapterId)
          : undefined;
        const targetPlaylistId =
          matchedPlaylist && matchedPlaylist.videos.some((v) => v.id === video.id)
            ? matchedPlaylist.id
            : '__latest__';
        const parsedTs = parseTimestamp(video.published);
        const timestamp = parsedTs > 0 ? parsedTs : nowMs - index * 1000;
        const dateLabel = formatYoutubeDate(video.published) || 'Just now';

        return {
          key: `yt:${video.id}`,
          source: 'youtube',
          timestamp,
          dateLabel,
          title: video.title,
          subtitle: video.chapterId
            ? `Chapter ${video.chapterId}`
            : youtubeLibrary.channelHandle,
          thumbnail: video.thumbnail || null,
          url: `https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`,
          video,
          targetPlaylistId,
        };
      });

    const fbItems: StageWindowItem[] = facebookFeed.posts
      .slice(0, 6)
      .map((post, index) => {
        const parsedTs = parseTimestamp(post.createdTime);
        return {
          key: `fb:${post.id}`,
          source: 'facebook',
          timestamp: parsedTs > 0 ? parsedTs : nowMs - index * 1000,
          dateLabel: formatFacebookDate(post.createdTime),
          title: getFacebookTitle(post.message),
          subtitle: facebookFeed.pageHandle,
          thumbnail: post.imageUrl,
          url: post.permalinkUrl,
          post,
        };
      });

    return [...ytItems, ...fbItems].sort((a, b) => b.timestamp - a.timestamp);
  }, [youtubeLibrary, facebookFeed]);

  const counts = useMemo(() => {
    let youtube = 0;
    let facebook = 0;
    for (const item of allItems) {
      if (item.source === 'youtube') youtube++;
      else facebook++;
    }
    return { all: allItems.length, youtube, facebook };
  }, [allItems]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (sourceFilter !== 'all' && item.source !== sourceFilter) return false;
      return true;
    });
  }, [allItems, sourceFilter]);

  const explicitIndex = userSelectedKey
    ? filteredItems.findIndex((item) => item.key === userSelectedKey)
    : -1;
  const activeIndex = filteredItems.length === 0 ? -1 : explicitIndex >= 0 ? explicitIndex : 0;
  const activeItem = activeIndex >= 0 ? filteredItems[activeIndex] : null;

  // Stage Manager strip shows the other recent windows ready to swap onto the center stage
  const stripItems = useMemo(() => {
    if (!activeItem) return filteredItems;
    return filteredItems.filter((item) => item.key !== activeItem.key);
  }, [filteredItems, activeItem]);

  const isSyncing = ytRefreshing || fbLoading;

  const handleSelectItem = (key: string, scrollStageOnMobile = false) => {
    setUserSelectedKey(key);
    setIsPlayingInline(false);
    if (
      scrollStageOnMobile &&
      typeof window !== 'undefined' &&
      window.innerWidth < 1024 &&
      stageRef.current
    ) {
      stageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleFilterChange = (next: SourceFilter) => {
    setSourceFilter(next);
    setUserSelectedKey(null);
    setIsPlayingInline(false);
  };

  const handleStep = (delta: number) => {
    if (filteredItems.length <= 1 || activeIndex < 0) return;
    const nextIdx = (activeIndex + delta + filteredItems.length) % filteredItems.length;
    handleSelectItem(filteredItems[nextIdx].key);
  };

  const handleRefreshAll = () => {
    setUserSelectedKey(null);
    setIsPlayingInline(false);
    refreshYoutube();
    refreshFacebook();
  };

  const handleStageTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (isPlayingInline || filteredItems.length <= 1) return;
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleStageTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || isPlayingInline || filteredItems.length <= 1) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) >= 52 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      handleStep(dx < 0 ? 1 : -1);
    }
  };

  const markImageFailed = (key: string) => {
    setFailedImages((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  };

  return (
    <section className="space-y-3.5 sm:space-y-4 pt-2" aria-label="YouTube and Facebook Stage Manager">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-3">
        <div className="space-y-0.5 sm:space-y-1">
          <h2 className="text-lg md:text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Latest Updates
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            YouTube lessons &amp; Facebook community posts from Unlock Education.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onNavigateToVideos()}
            className="inline-flex items-center gap-1.5 py-1 text-indigo-600 dark:text-indigo-400 hover:underline transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            All Video Lessons
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
            /
          </span>
          <a
            href="https://t.me/UnlockEducation25"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            Telegram
          </a>
        </div>
      </div>

      {/* macOS Stage Manager Surface */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-slate-100 via-indigo-50/40 to-slate-200/80 dark:from-[#0b1120] dark:via-[#111933] dark:to-[#090e1a] shadow-sm">
        {/* Subtle Ambient Wallpaper Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-indigo-400/15 dark:bg-indigo-500/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/4 w-80 h-80 rounded-full bg-sky-400/15 dark:bg-sky-500/10 blur-3xl"
        />

        {/* Top Menu Bar (Full-width equal segmented control on mobile, compact macOS bar on desktop) */}
        <div className="relative z-10 px-2.5 sm:px-5 py-2.5 bg-white/75 dark:bg-slate-950/65 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2 sm:gap-3">
          {/* Segmented Source Tabs */}
          <div
            role="tablist"
            aria-label="Filter updates by platform"
            className="grid grid-cols-3 flex-1 sm:flex-none sm:inline-flex items-center gap-1 p-1 bg-slate-200/75 dark:bg-white/5 rounded-xl border border-slate-200/80 dark:border-white/10"
          >
            <button
              type="button"
              role="tab"
              aria-selected={sourceFilter === 'all'}
              onClick={() => handleFilterChange('all')}
              className={`min-h-[36px] sm:min-h-0 px-2 sm:px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 tabular-nums ${
                sourceFilter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>All</span>
              <span className="text-[10px] sm:text-xs opacity-70">({counts.all})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={sourceFilter === 'youtube'}
              onClick={() => handleFilterChange('youtube')}
              className={`min-h-[36px] sm:min-h-0 px-2 sm:px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 tabular-nums ${
                sourceFilter === 'youtube'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Youtube className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
              <span>YouTube</span>
              <span className="hidden sm:inline opacity-70">({counts.youtube})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={sourceFilter === 'facebook'}
              onClick={() => handleFilterChange('facebook')}
              className={`min-h-[36px] sm:min-h-0 px-2 sm:px-3 py-1.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 tabular-nums ${
                sourceFilter === 'facebook'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Facebook className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
              <span>Facebook</span>
              <span className="hidden sm:inline opacity-70">({counts.facebook})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleRefreshAll}
            disabled={isSyncing}
            aria-label="Refresh updates"
            className="inline-flex items-center justify-center gap-1.5 h-[44px] w-[44px] sm:h-auto sm:w-auto sm:px-3 sm:py-1.5 bg-white/90 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl sm:rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0 active:scale-95"
            title="Refresh updates"
          >
            <RefreshCw className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Stage Manager Workspace: Center Active Window + Bottom Dock (Mobile) / Left 3D Angled Strip (Desktop) */}
        <div className="relative z-10 p-2.5 sm:p-5 lg:p-7 flex flex-col-reverse lg:flex-row items-stretch gap-3.5 sm:gap-5 lg:gap-7">
          {/* Stage Manager Recent Windows Strip (Horizontal snap dock on mobile, Left 3D angled strip on desktop) */}
          <div className="lg:w-[228px] xl:w-[248px] shrink-0 flex flex-col justify-center">
            {stripItems.length > 0 && (
              <div className="flex lg:hidden items-center justify-between px-1 mb-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <span>More Updates</span>
                <span className="font-mono tabular-nums">
                  {activeIndex + 1} / {filteredItems.length}
                </span>
              </div>
            )}

            {stripItems.length > 0 ? (
              <div
                className="flex lg:flex-col gap-3 lg:gap-3.5 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto snap-x snap-mandatory lg:snap-none scroll-pl-1 pb-1 lg:pr-2 lg:max-h-[540px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [perspective:1000px]"
                aria-label="Stage Manager recent windows"
              >
                {stripItems.map((item) => {
                  const showThumb = Boolean(item.thumbnail && !failedImages[item.key]);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelectItem(item.key, true)}
                      className="group relative w-[212px] sm:w-[224px] lg:w-full shrink-0 snap-start text-left rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-sm lg:shadow-md hover:shadow-xl hover:border-indigo-400/70 dark:hover:border-indigo-400/60 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-200 ease-out origin-left lg:[transform:perspective(900px)_rotateY(16deg)] lg:hover:[transform:perspective(900px)_rotateY(0deg)_translateX(6px)_scale(1.03)] active:scale-[0.97]"
                      aria-label={`Open ${item.title} in center stage`}
                    >
                      {/* Miniature macOS Window Bar */}
                      <div className="px-2.5 py-1.5 bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200/70 dark:border-white/10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1" aria-hidden="true">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-[#FF5F56] transition-colors" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-[#FFBD2E] transition-colors" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-[#27C93F] transition-colors" />
                        </div>
                        <div className="flex items-center gap-1 min-w-0 text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
                          {item.source === 'youtube' ? (
                            <Youtube className="w-3 h-3 text-[#FF0000] shrink-0" />
                          ) : (
                            <Facebook className="w-3 h-3 text-[#1877F2] shrink-0" />
                          )}
                          <span className="truncate">
                            {item.source === 'youtube' ? 'YouTube' : 'Facebook'}
                          </span>
                        </div>
                      </div>

                      {/* Miniature Window Preview Thumbnail */}
                      <div className="relative aspect-[16/9] w-full bg-slate-900/90 overflow-hidden">
                        {showThumb ? (
                          <img
                            src={item.thumbnail!}
                            alt={item.title}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={() => markImageFailed(item.key)}
                            className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
                            {item.source === 'youtube' ? (
                              <Youtube className="w-6 h-6 text-[#FF0000]/80" />
                            ) : (
                              <Facebook className="w-6 h-6 text-[#1877F2]/80" />
                            )}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between gap-1 text-[10px] text-white/95 font-medium tabular-nums">
                          <span className="truncate">{item.subtitle}</span>
                          {item.dateLabel && (
                            <span className="text-white/80 shrink-0">{item.dateLabel}</span>
                          )}
                        </div>
                      </div>

                      {/* Miniature Window Caption */}
                      <div className="px-2.5 py-2 min-h-[46px] flex items-center">
                        <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2 leading-snug transition-colors">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : isSyncing ? (
              <div className="flex lg:flex-col gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-busy="true">
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    className="w-[212px] lg:w-full h-32 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-white/10 animate-pulse shrink-0"
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-white/10 p-4 text-center text-[11px] text-slate-500 dark:text-slate-400">
                No other windows in queue
              </div>
            )}
          </div>

          {/* Center / Main Stage: Active Floating macOS Window */}
          <div
            ref={stageRef}
            onTouchStart={handleStageTouchStart}
            onTouchEnd={handleStageTouchEnd}
            className="flex-1 min-w-0 flex flex-col scroll-mt-20"
          >
            <AnimatePresence mode="wait">
              {activeItem ? (
                <motion.div
                  key={activeItem.key}
                  initial={{ opacity: 0, x: -16, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 14, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 flex flex-col rounded-xl sm:rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/15 shadow-lg sm:shadow-2xl shadow-slate-900/10 dark:shadow-black/50 overflow-hidden"
                >
                  {/* Active macOS Window Titlebar */}
                  <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-100/90 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2 sm:gap-3">
                    {/* Traffic-light window dots */}
                    <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F56]/90 border border-black/10" />
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]/90 border border-black/10" />
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27C93F]/90 border border-black/10" />
                    </div>

                    {/* Centered App Identity & Metadata */}
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 text-xs text-slate-600 dark:text-slate-300 tabular-nums">
                      {activeItem.source === 'youtube' ? (
                        <Youtube className="w-4 h-4 text-[#FF0000] shrink-0" />
                      ) : (
                        <Facebook className="w-4 h-4 text-[#1877F2] shrink-0" />
                      )}
                      <span className="font-semibold text-slate-900 dark:text-white truncate">
                        {activeItem.source === 'youtube'
                          ? youtubeLibrary.channelName
                          : facebookFeed.pageName}
                      </span>
                      <span className="hidden md:inline text-slate-400" aria-hidden="true">
                        ·
                      </span>
                      <span className="hidden md:inline truncate text-slate-500 dark:text-slate-400">
                        {activeItem.subtitle}
                      </span>
                      {activeItem.dateLabel && (
                        <>
                          <span className="hidden md:inline text-slate-400" aria-hidden="true">
                            ·
                          </span>
                          <span className="hidden md:inline shrink-0 text-slate-500 dark:text-slate-400">
                            {activeItem.dateLabel}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Window Stepper */}
                    <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                      <span className="hidden sm:inline font-mono text-[11px] text-slate-400 mr-1 tabular-nums">
                        {activeIndex + 1}/{filteredItems.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleStep(-1)}
                        disabled={filteredItems.length <= 1}
                        aria-label="Previous window"
                        className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-35 transition-colors cursor-pointer active:scale-95"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStep(1)}
                        disabled={filteredItems.length <= 1}
                        aria-label="Next window"
                        className="w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-35 transition-colors cursor-pointer active:scale-95"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Active Window Content */}
                  <div className="p-3.5 sm:p-5 md:p-6 flex-1 flex flex-col justify-between gap-4 sm:gap-5">
                    <div className="space-y-3 sm:space-y-4">
                      {/* Media Viewport */}
                      {activeItem.source === 'youtube' ? (
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-white/10">
                          {isPlayingInline ? (
                            <iframe
                              key={activeItem.video.id}
                              src={`https://www.youtube.com/embed/${encodeURIComponent(activeItem.video.id)}?autoplay=1&rel=0`}
                              title={activeItem.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full border-0"
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIsPlayingInline(true)}
                              className="group relative w-full h-full block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                              aria-label={`Play ${activeItem.title}`}
                            >
                              {activeItem.thumbnail && !failedImages[activeItem.key] ? (
                                <img
                                  src={activeItem.thumbnail}
                                  alt={activeItem.title}
                                  referrerPolicy="no-referrer"
                                  onError={() => markImageFailed(activeItem.key)}
                                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-900 text-slate-300">
                                  <Youtube className="w-10 h-10 text-[#FF0000]" />
                                  <span className="text-xs font-medium">
                                    {youtubeLibrary.channelHandle}
                                  </span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent flex items-center justify-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold shadow-lg group-hover:bg-indigo-600 transition-colors">
                                  <PlayCircle className="w-4 h-4" />
                                  Play Lesson
                                </div>
                              </div>
                            </button>
                          )}
                        </div>
                      ) : activeItem.thumbnail && !failedImages[activeItem.key] ? (
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200/80 dark:border-white/10">
                          <img
                            src={activeItem.thumbnail}
                            alt={activeItem.title}
                            referrerPolicy="no-referrer"
                            onError={() => markImageFailed(activeItem.key)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full rounded-xl bg-gradient-to-br from-slate-100 via-white to-indigo-50/60 dark:from-slate-800/80 dark:via-slate-900 dark:to-indigo-950/30 border border-slate-200 dark:border-white/10 px-4 py-5 flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2 shrink-0 flex items-center justify-center">
                            <img
                              src="/logo.png"
                              alt="Unlock Education"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-display font-bold text-slate-900 dark:text-white">
                              Unlock Education Update
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {facebookFeed.pageHandle} · Community Post
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Compact Mobile Metadata Line (visible on mobile & tablet, shown in titlebar on md+) */}
                      <div className="flex md:hidden items-center justify-between gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                        <span className="truncate">{activeItem.subtitle}</span>
                        {activeItem.dateLabel && (
                          <span className="shrink-0">{activeItem.dateLabel}</span>
                        )}
                      </div>

                      {/* Title & Full Readable Text */}
                      {activeItem.source === 'youtube' ? (
                        <h3 className="text-[15px] sm:text-lg font-display font-bold text-slate-900 dark:text-white leading-snug text-balance">
                          {activeItem.title}
                        </h3>
                      ) : (
                        <div className="max-h-44 sm:max-h-40 overflow-y-auto pr-1">
                          <p className="text-[13.5px] sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line break-words">
                            {activeItem.post.message}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Bar (Thumb-friendly stacked CTA + balanced secondary row on mobile, inline row on desktop) */}
                    <div className="pt-3.5 sm:pt-4 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-2.5">
                      {activeItem.source === 'youtube' ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              onNavigateToVideos(
                                activeItem.targetPlaylistId,
                                activeItem.video.id
                              )
                            }
                            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl sm:rounded-lg text-[13px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.99]"
                          >
                            <PlayCircle className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                            Open in Video Library
                          </button>

                          <div
                            className={`grid ${
                              activeItem.video.chapterId ? 'grid-cols-2' : 'grid-cols-1'
                            } sm:contents gap-2`}
                          >
                            {activeItem.video.chapterId && (
                              <button
                                type="button"
                                onClick={() => onSelectChapter(activeItem.video.chapterId!)}
                                className="inline-flex items-center justify-center gap-1.5 min-h-[42px] sm:min-h-0 px-3 sm:px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-xl sm:rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.99]"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                Study Chapter {activeItem.video.chapterId}
                              </button>
                            )}
                            <a
                              href={activeItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 min-h-[42px] sm:min-h-0 px-3 py-2 bg-slate-100/70 sm:bg-transparent dark:bg-slate-800/60 sm:dark:bg-transparent rounded-xl sm:rounded-lg text-xs font-semibold text-slate-700 sm:text-slate-600 dark:text-slate-200 sm:dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
                            >
                              YouTube
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </>
                      ) : (
                        <>
                          <a
                            href={activeItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl sm:rounded-lg text-[13px] sm:text-xs font-semibold transition-colors whitespace-nowrap shrink-0 active:scale-[0.99]"
                          >
                            <Facebook className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                            View Original Post
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={facebookFeed.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 min-h-[42px] sm:min-h-0 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-xl sm:rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 active:scale-[0.99]"
                          >
                            Follow Page
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-stage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/15 p-8 sm:p-10 flex flex-col items-center justify-center text-center gap-3 min-h-[280px] sm:min-h-[340px]"
                >
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    No updates loaded yet.
                  </p>
                  <a
                    href={
                      sourceFilter === 'facebook'
                        ? facebookFeed.pageUrl
                        : youtubeLibrary.channelUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-0 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl sm:rounded-lg text-xs font-semibold transition-colors"
                  >
                    Open {sourceFilter === 'facebook' ? 'Facebook Page' : 'YouTube Channel'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
