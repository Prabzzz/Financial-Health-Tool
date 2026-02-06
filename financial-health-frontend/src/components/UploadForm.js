import React, { useState } from 'react';
import axios from 'axios';

function UploadForm({ userId, onUploadSuccess }) {  
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/financials/upload/${userId}`,
        formData
      );
      setStatus('Upload successful!');
      if (onUploadSuccess) {
        onUploadSuccess(res.data.data_id);   
      }
    } catch (error) {
      setStatus('Upload failed: ' + (error.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} accept=".csv,.xlsx,.pdf" />
        <button type="submit" disabled={!file}>Upload</button>
      </form>
      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
    </div>
  );
}

export default UploadForm;