
import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WebViewProps {
  url: string;
  className?: string;
}

const WebView: React.FC<WebViewProps> = ({ url, className = '' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentUrl, setCurrentUrl] = useState(url);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = currentUrl;
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    if (!isOnline) {
      toast({
        title: "Offline Mode",
        description: "You're viewing cached content. Some features may be limited.",
        variant: "default"
      });
    }
  };

  const handleError = () => {
    setIsLoading(false);
    toast({
      title: "Connection Error",
      description: "Failed to load content. Please check your internet connection.",
      variant: "destructive"
    });
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <RefreshCw className="animate-spin h-6 w-6 md:h-8 md:w-8 text-blue-600 mb-2" />
            <p className="text-gray-600 text-sm md:text-base">Loading...</p>
          </div>
        </div>
      )}

      {/* Network status indicator */}
      <div className="absolute top-1 right-1 md:top-2 md:right-2 z-20">
        {isOnline ? (
          <Wifi className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
        )}
      </div>

      {/* Refresh button */}
      <button
        onClick={handleRefresh}
        className="absolute top-1 left-1 md:top-2 md:left-2 z-20 bg-white rounded-full p-1.5 md:p-2 shadow-md hover:shadow-lg transition-shadow"
      >
        <RefreshCw className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
      </button>

      {/* WebView iframe with mobile optimizations */}
      <iframe
        ref={iframeRef}
        src={currentUrl}
        className="w-full h-full border-0 rounded-none md:rounded-lg bg-white"
        onLoad={handleLoad}
        onError={handleError}
        title="Bells University Portal"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-navigation allow-downloads"
        style={{
          minHeight: '100%',
          width: '100%',
          transform: 'scale(1)',
          transformOrigin: '0 0'
        }}
        allowFullScreen
      />
    </div>
  );
};

export default WebView;
