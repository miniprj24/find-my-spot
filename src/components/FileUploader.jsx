
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUpload } from '../context/UploadContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { setIsLoading, setJsonReport, setVideoDownloadUrl, setError } = useUpload();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const validateFile = (file) => {
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return false;
    }
    // Check file size (limit to 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast.error('File size exceeds 100MB limit');
      return false;
    }
    return true;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a video file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('video', file);

    try {
      const backendUrl = import.meta.env.VITE_PYTHON_BACKEND_URL;
      const response = await axios.post(
        `${backendUrl}/upload-video`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setJsonReport(response.data.json_report);
      setVideoDownloadUrl(response.data.video_download_url);
      setIsLoading(false);
      
      navigate('/results');
    } catch (error) {
      setIsLoading(false);
      console.error('Upload failed:', error);
      let errorMessage = 'An unexpected error occurred during upload';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 
                      'Server error. Please try again later.';
      }
      
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Upload Video for Parking Spot Analysis</h2>
        <p className="text-gray-500 mt-2">
          Upload your video footage to analyze available parking spots
        </p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : file
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/*"
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center">
          <svg
            className={`w-16 h-16 mb-4 ${file ? 'text-green-500' : 'text-blue-500'}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          {file ? (
            <div>
              <p className="font-medium text-green-600">File selected:</p>
              <p className="text-sm text-gray-600 break-all">{file.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div>
              <p className="font-medium">Drag and drop your video here</p>
              <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleUpload}
          disabled={!file}
          className="px-6 py-2 text-lg flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          Upload & Analyze
        </Button>
      </div>
    </Card>
  );
};

export default FileUploader;
