import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { PlayCircle, Loader2 } from 'lucide-react';

interface TelegramVideoPlayerProps {
  fileId: string;
}

export default function TelegramVideoPlayer({ fileId }: TelegramVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [videoUrl, setVideoUrl] = useState('');
  
  React.useEffect(() => {
    // Reverting to proxy because Telegram sends raw 'application/octet-stream' for direct files, which breaks the HTML5 video player.
    // Our proxy explicitly transforms the header to 'video/mp4'.
    setVideoUrl(`/api/stream/telegram/${fileId}`);
  }, [fileId]);
  
  // Basic check to alert the user if they accidentally put a link instead of an ID
  const isLink = fileId.includes('http') || fileId.includes('t.me');

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 aspect-video shadow-lg mb-8 border border-slate-200/50 dark:border-slate-800/40">
      
      {isLink && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-400 z-20 bg-slate-900 p-6 text-center">
          <p className="text-sm font-bold mb-2">Invalid Video ID</p>
          <p className="text-xs text-slate-400">You entered a link. Please send the actual video to the Telegram Bot to get a valid <b>file_id</b>.</p>
        </div>
      )}
      {/* Removing the manual loading overlay completely because HTML5 video handles its own loading state naturally */}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 z-10 bg-slate-900 p-4 text-center">
          <p className="text-sm font-bold mb-1">Video Error</p>
          <p className="text-xs text-slate-500">Could not play this video format. Make sure it is a valid <b>.mp4</b> file.</p>
        </div>
      )}

      <ReactPlayer
        url={videoUrl}
        config={{
          file: {
            forceVideo: true,
            attributes: {
              controlsList: 'nodownload',
              crossOrigin: 'anonymous'
            }
          }
        }}
        width="100%"
        height="100%"
        controls={true}
        playing={isPlaying}
        onReady={() => setIsReady(true)}
        onError={(e) => {
          console.error("Video player error:", e);
          // Don't set error on first try to allow ReactPlayer to try alternative methods or just let the user see the actual browser error
          // setHasError(true); 
        }}

      />
    </div>
  );
}
