
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { AlertCircle, CheckCircle } from 'lucide-react';

const ColabConnector = () => {
  const [backendUrl, setBackendUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if there's a saved backend URL
    const savedUrl = api.getBackendUrl();
    if (savedUrl) {
      setBackendUrl(savedUrl);
      // Check connection status
      checkConnection(savedUrl);
    }
  }, []);

  const checkConnection = async (url: string) => {
    try {
      const connected = await api.connectToColabBackend(url);
      setIsConnected(connected);
      return connected;
    } catch (error) {
      console.error("Error checking connection:", error);
      setIsConnected(false);
      return false;
    }
  };

  const handleConnect = async () => {
    if (!backendUrl) {
      toast({
        title: "URL Required",
        description: "Please enter your Google Colab backend URL.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await checkConnection(backendUrl);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect to Google Colab</CardTitle>
        <CardDescription>
          Enter the ngrok URL from your Google Colab notebook to enable backend functionality.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              id="backend-url"
              placeholder="https://your-ngrok-url.ngrok.io"
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              className="w-full"
            />
          </div>
          
          {isConnected && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Connected to backend</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConnect} 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "Connecting..." : (isConnected ? "Reconnect" : "Connect")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ColabConnector;
