

import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw, Wifi, WifiOff, Download, MoreVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WebViewProps {
  url: string;
  className?: string;
}

const WebView: React.FC<WebViewProps> = ({ url, className = '' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
      
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentUrl;
        }
        setIsRefreshing(false);
      }, 500);
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
    setShowMenu(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setIsRefreshing(false);
    
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
    <div className={`absolute inset-0 w-full h-full overflow-hidden bg-white ${className}`}>
      {/* Floating Action Menu */}
      <div className="absolute top-4 right-4 z-50">
        <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="rounded-full w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSaveOffline}>
              <Download className="h-4 w-4 mr-2" />
              Save Offline
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              {isOnline ? (
                <>
                  <Wifi className="h-4 w-4 mr-2 text-green-500" />
                  Online
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 mr-2 text-red-500" />
                  Offline
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-40">
          <div className="flex flex-col items-center">
            <RefreshCw className="animate-spin h-8 w-8 text-blue-600 mb-3" />
            <p className="text-gray-600 text-sm">Loading Bells Portal...</p>
          </div>
        </div>
      )}

      {/* Full Screen WebView iframe */}
      <iframe
        ref={iframeRef}
        src={currentUrl}
        className="w-full h-full border-0 bg-white"
        style={{ width: '100%', height: '100%' }}
        onLoad={handleLoad}
        onError={handleError}
        title="Bells University Portal"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-navigation allow-downloads allow-modals"
        allowFullScreen
      />
    </div>
  );
};

export default WebView;
