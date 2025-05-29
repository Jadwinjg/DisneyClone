import React, { useState, useRef, useEffect } from 'react';

function VideoUploads({ userId }) {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError('');
    setUploadUrl('');
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a video file first');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('userId', userId); 

    try {
      setUploading(true);
      const response = await fetch(`${backendUrl}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploadUrl(`${backendUrl}${data.filePath}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center text-white px-4 py-10 min-h-screen bg-black">
      
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Choose Video
        </button>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {file && !uploading && !uploadUrl && (
        <video controls className="mt-6 w-full max-w-md rounded shadow-lg bg-black">
          <source src={URL.createObjectURL(file)} type="video/mp4" />
        </video>
      )}

      {uploadUrl && (
        <video controls className="mt-6 w-full max-w-md rounded shadow-lg bg-black">
          <source src={uploadUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default VideoUploads;
