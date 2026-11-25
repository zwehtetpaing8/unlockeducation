import { useMemo, useState, useEffect } from 'react';
import {
  Youtube,
  Facebook,
  PlayCircle,
  ExternalLink,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
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
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [isPlayingInline, setIsPlayingInline] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const allItems = useMemo<StageWindowItem[]>(() => {
    const ytItems: StageWindowItem[] = youtubeLibrary.latestUploads
      .slice(0, 6)
      .map((video) => {
        const matchedPlaylist = video.chapterId
          ? youtubeLibrary.playlists.find((pl) => pl.chapterId === video.chapterId)
          : undefined;
        const targetPlaylistId =
          matchedPlaylist && matchedPlaylist.videos.some((v) => v.id === video.id)
            ? matchedPlaylist.id
            : '__latest__';

        return {
          key: `yt:${video.id}`,
          source: 'youtube',
          timestamp: parseTimestamp(video.published),
          dateLabel: formatYoutubeDate(video.published),
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
      .map((post) => ({
        key: `fb:${post.id}`,
        source: 'facebook',
        timestamp: parseTimestamp(post.createdTime),
        dateLabel: formatFacebookDate(post.createdTime),
        title: getFacebookTitle(post.message),
        subtitle: facebookFeed.pageHandle,
        thumbnail: post.imageUrl,
        url: post.permalinkUrl,
        post,
      }));

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

  useEffect(() => {
    if (filteredItems.length === 0) {
      setSelectedKey('');
      return;
    }
    if (!filteredItems.some((item) => item.key === selectedKey)) {
      setSelectedKey(filteredItems[0].key);
      setIsPlayingInline(false);
    }
  }, [filteredItems, selectedKey]);

  const selectedIndex = filteredItems.findIndex((item) => item.key === selectedKey);
  const activeItem =
    selectedIndex >= 0 ? filteredItems[selectedIndex] : filteredItems[0] || null;
  const activeIndex = selectedIndex >= 0 ? selectedIndex : activeItem ? 0 : -1;

  // Stage Manager left strip shows the other recent windows ready to swap onto the center stage
  const stripItems = useMemo(() => {
    if (!activeItem) return filteredItems;
    return filteredItems.filter((item) => item.key !== activeItem.key);
  }, [filteredItems, activeItem]);

  const isSyncing = ytRefreshing || fbLoading;

  const handleSelectItem = (key: string) => {
    setSelectedKey(key);
    setIsPlayingInline(false);
  };

  const handleStep = (delta: number) => {
    if (filteredItems.length === 0 || activeIndex < 0) return;
    const nextIdx = (activeIndex + delta + filteredItems.length) % filteredItems.length;
    handleSelectItem(filteredItems[nextIdx].key);
  };

  const handleRefreshAll = () => {
    refreshYoutube();
    refreshFacebook();
  };

  const handleCopyLink = (item: StageWindowItem) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(item.url).catch(() => {});
    }
    setCopiedKey(item.key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === item.key ? null : prev));
    }, 2000);
  };

  const markImageFailed = (key: string) => {
    setFailedImages((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  };

  return (
    <section className="space-y-4 pt-2" aria-label="YouTube and Facebook Stage Manager">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
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
            className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline transition-colors cursor-pointer whitespace-nowrap shrink-0"
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
            className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            Telegram
          </a>
        </div>
      </div>

      {/* macOS Stage Manager Desktop Surface */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-slate-100 via-indigo-50/40 to-slate-200/80 dark:from-[#0b1120] dark:via-[#111933] dark:to-[#090e1a] shadow-sm">
        {/* Subtle Ambient Wallpaper Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-indigo-400/15 dark:bg-indigo-500/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/4 w-80 h-80 rounded-full bg-sky-400/15 dark:bg-sky-500/10 blur-3xl"
        />

        {/* Top Menu Bar (macOS-style translucent bar) */}
        <div className="relative z-10 px-4 sm:px-5 py-2.5 bg-white/75 dark:bg-slate-950/65 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
          {/* Segmented Source Tabs */}
          <div
            role="tablist"
            aria-label="Filter updates by platform"
            className="inline-flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-white/5 rounded-xl border border-slate-200/80 dark:border-white/10 overflow-x-auto max-w-full"
          >
            <button
              type="button"
              role="tab"
              aria-selected={sourceFilter === 'all'}
              onClick={() => setSourceFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                sourceFilter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({counts.all})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={sourceFilter === 'youtube'}
              onClick={() => setSourceFilter('youtube')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                sourceFilter === 'youtube'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Youtube className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
              YouTube ({counts.youtube})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={sourceFilter === 'facebook'}
              onClick={() => setSourceFilter('facebook')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                sourceFilter === 'facebook'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Facebook className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
              Facebook ({counts.facebook})
            </button>
          </div>

          <button
            type="button"
            onClick={handleRefreshAll}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0"
            title="Refresh updates"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Stage Manager Workspace: Left 3D Angled Strip + Center Active Floating Window */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-7 flex flex-col-reverse lg:flex-row items-stretch gap-5 lg:gap-7">
          {/* Left Stage Manager Strip (3D tilted miniature app windows on desktop, horizontal strip on mobile) */}
          <div className="lg:w-[228px] xl:w-[248px] shrink-0 flex flex-col justify-center">

            {stripItems.length > 0 ? (
              <div
                className="flex lg:flex-col gap-3.5 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto pb-2 lg:pb-1 lg:pr-2 lg:max-h-[540px] [perspective:1000px]"
                aria-label="Stage Manager recent windows"
              >
                {stripItems.map((item) => {
                  const showThumb = Boolean(item.thumbnail && !failedImages[item.key]);
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelectItem(item.key)}
                      className="group relative w-[186px] lg:w-full shrink-0 text-left rounded-xl bg-white/92 dark:bg-slate-900/92 backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-md hover:shadow-xl hover:border-indigo-400/70 dark:hover:border-indigo-400/60 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-200 ease-out origin-left lg:[transform:perspective(900px)_rotateY(16deg)] lg:hover:[transform:perspective(900px)_rotateY(0deg)_translateX(6px)_scale(1.03)] active:scale-[0.98]"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between gap-1 text-[10px] text-white/95 font-medium tabular-nums">
                          <span className="truncate">{item.subtitle}</span>
                          {item.dateLabel && (
                            <span className="text-white/75 shrink-0">{item.dateLabel}</span>
                          )}
                        </div>
                      </div>

                      {/* Miniature Window Caption */}
                      <div className="px-2.5 py-2">
                        <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2 leading-snug transition-colors">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : isSyncing ? (
              <div className="flex lg:flex-col gap-3" aria-busy="true">
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    className="w-[180px] lg:w-full h-28 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-white/10 animate-pulse shrink-0"
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
          <div className="flex-1 min-w-0 flex flex-col">
            <AnimatePresence mode="wait">
              {activeItem ? (
                <motion.div
                  key={activeItem.key}
                  initial={{ opacity: 0, x: -22, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 18, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 flex flex-col rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/15 shadow-2xl shadow-slate-900/10 dark:shadow-black/50 overflow-hidden"
                >
                  {/* Active macOS Window Titlebar */}
                  <div className="px-4 py-2.5 bg-slate-100/90 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
                    {/* Traffic-light window dots */}
                    <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/90 border border-black/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/90 border border-black/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/90 border border-black/10" />
                    </div>

                    {/* Centered App Identity & Metadata */}
                    <div className="flex items-center gap-2 min-w-0 text-xs text-slate-600 dark:text-slate-300 tabular-nums">
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
                      <span className="hidden sm:inline text-slate-400" aria-hidden="true">
                        ·
                      </span>
                      <span className="hidden sm:inline truncate text-slate-500 dark:text-slate-400">
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
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="hidden sm:inline font-mono text-[11px] text-slate-400 mr-1 tabular-nums">
                        {activeIndex + 1}/{filteredItems.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleStep(-1)}
                        disabled={filteredItems.length <= 1}
                        aria-label="Previous window"
                        className="p-1 rounded-md hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-35 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStep(1)}
                        disabled={filteredItems.length <= 1}
                        aria-label="Next window"
                        className="p-1 rounded-md hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 disabled:opacity-35 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Active Window Content */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-5">
                    <div className="space-y-4">
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
                                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold shadow-lg group-hover:bg-indigo-600 transition-colors">
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
                        <div className="w-full rounded-xl bg-gradient-to-br from-slate-100 via-white to-indigo-50/60 dark:from-slate-800/80 dark:via-slate-900 dark:to-indigo-950/30 border border-slate-200 dark:border-white/10 px-5 py-6 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2 shrink-0 flex items-center justify-center">
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

                      {/* Title & Full Readable Text */}
                      {activeItem.source === 'youtube' ? (
                        <div className="space-y-1.5">
                          <h3 className="text-base md:text-lg font-display font-bold text-slate-900 dark:text-white leading-snug text-balance">
                            {activeItem.title}
                          </h3>
                          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Grade 12 Mathematics video lesson from {youtubeLibrary.channelHandle}. Watch directly on stage or open the full chapter playlist.
                          </p>
                        </div>
                      ) : (
                        <div className="max-h-40 overflow-y-auto pr-1">
                          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                            {activeItem.post.message}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center gap-2.5">
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
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <PlayCircle className="w-3.5 h-3.5" />
                            Open in Video Library
                          </button>
                          {activeItem.video.chapterId && (
                            <button
                              type="button"
                              onClick={() => onSelectChapter(activeItem.video.chapterId!)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              Study Chapter {activeItem.video.chapterId}
                            </button>
                          )}
                          <a
                            href={activeItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
                          >
                            YouTube
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            href={activeItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                          >
                            <Facebook className="w-3.5 h-3.5" />
                            View Original Post
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={facebookFeed.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                          >
                            Follow Page
                          </a>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => handleCopyLink(activeItem)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ml-auto"
                      >
                        {copiedKey === activeItem.key ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy Link
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-stage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/15 p-10 flex flex-col items-center justify-center text-center gap-3 min-h-[340px]"
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold transition-colors"
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
