
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JsonViewer from '@/components/JsonViewer';
import { useUpload } from '@/context/UploadContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const Results = () => {
  const { jsonReport, videoDownloadUrl } = useUpload();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to upload page if there's no data
    if (!jsonReport || !videoDownloadUrl) {
      toast.error("No analysis data found. Please upload a video first.");
      navigate('/');
    }
  }, [jsonReport, videoDownloadUrl, navigate]);

  if (!jsonReport) {
    return null; // This will prevent any flash of content before redirect
  }

  const downloadUrl = `${import.meta.env.VITE_PYTHON_BACKEND_URL}${videoDownloadUrl}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <header className="w-full py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900">
            Analysis Results
          </h1>
          <p className="text-center text-blue-600 mt-2 max-w-2xl mx-auto">
            Review your video analysis and download the processed footage
          </p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Processed Video</h2>
            <div className="flex flex-col items-center">
              <p className="text-gray-600 mb-4">
                Your video has been processed with parking spot detection. 
                Download the analyzed video to see the results.
              </p>
              <a 
                href={downloadUrl} 
                download 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Processed Video
              </a>
            </div>
          </Card>
          
          <Card className="p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Analysis Report</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <JsonViewer data={jsonReport} />
            </div>
          </Card>
          
          <div className="flex justify-center mt-8">
            <Button 
              onClick={() => navigate('/')}
              variant="outline" 
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Upload Another Video
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="w-full py-6 bg-blue-900 text-white mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Parking Spot Detector | AI-powered video analysis</p>
        </div>
      </footer>
    </div>
  );
};

export default Results;
