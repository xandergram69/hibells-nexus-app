
import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw, Wifi, WifiOff, Download, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface WebViewProps {
  url: string;
  className?: string;
}

const WebView: React.FC<WebViewProps> = ({ url, className = '' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
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

  const handleRefresh = async () => {
    if (iframeRef.current) {
      setIsRefreshing(true);
      setIsLoading(true);
      
      // Add a small delay to show refresh animation
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentUrl;
        }
        setIsRefreshing(false);
      }, 500);
    }
  };

  const handleGoBack = () => {
    if (iframeRef.current && canGoBack) {
      iframeRef.current.contentWindow?.history.back();
    }
  };

  const handleSaveOffline = () => {
    const savedPages = JSON.parse(localStorage.getItem('savedPages') || '[]');
    const pageData = {
      id: Date.now().toString(),
      url: currentUrl,
      title: `Bells Portal - ${new Date().toLocaleDateString()}`,
      savedAt: new Date().toISOString(),
      type: 'portal'
    };
    
    savedPages.push(pageData);
    localStorage.setItem('savedPages', JSON.stringify(savedPages));
    
    toast({
      title: "Saved for offline use! 📱",
      description: "Page saved to Resources tab",
      duration: 3000,
    });
  };

  const handleLoad = () => {
    setIsLoading(false);
    setIsRefreshing(false);
    
    // Check if we can go back (simplified check)
    setCanGoBack(window.history.length > 1);
    
    if (!isOnline) {
      toast({
        title: "Offline Mode",
        description: "Viewing cached content. Some features may be limited.",
        variant: "default"
      });
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setIsRefreshing(false);
    toast({
      title: "Connection Error",
      description: "Failed to load portal. Please check your connection.",
      variant: "destructive"
    });
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-white ${className}`}>
      {/* Enhanced Toolbar */}
      <div className="flex items-center justify-between bg-blue-600 text-white p-3 shadow-lg z-30 relative">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleGoBack}
            disabled={!canGoBack}
            className={`p-2 rounded-full ${canGoBack ? 'hover:bg-white/10' : 'opacity-30'}`}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="flex-1 text-center">
          <p className="text-sm font-medium">Bells Portal</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={handleSaveOffline}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/10 h-8 px-2"
          >
            <Download className="h-4 w-4 mr-1" />
            <span className="text-xs">Save</span>
          </Button>
          
          <div className="p-1">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-300" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-300" />
            )}
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-20" style={{ top: '56px' }}>
          <div className="flex flex-col items-center">
            <RefreshCw className="animate-spin h-8 w-8 text-blue-600 mb-3" />
            <p className="text-gray-600 text-sm">Loading Bells Portal...</p>
          </div>
        </div>
      )}

      {/* Enhanced WebView iframe */}
      <iframe
        ref={iframeRef}
        src={currentUrl}
        className="w-full border-0 bg-white"
        style={{ height: 'calc(100% - 56px)' }}
        onLoad={handleLoad}
        onError={handleError}
        title="Bells University Portal"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-navigation allow-downloads allow-modals"
        allowFullScreen
      />

      {/* Mobile viewport injection script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (window.self !== window.top) {
              const viewport = document.querySelector('meta[name="viewport"]');
              if (!viewport) {
                const meta = document.createElement('meta');
                meta.name = 'viewport';
                meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                document.head.appendChild(meta);
              }
            }
          `
        }}
      />
    </div>
  );
};

export default WebView;
