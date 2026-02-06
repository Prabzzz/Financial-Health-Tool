import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import AnalysisDashboard from '../components/AnalysisDashboard';

function FinancialPage() {
  const [userId] = useState(1);
  const [currentDataId, setCurrentDataId] = useState(null);

  const handleUploadSuccess = (newDataId) => {
    setCurrentDataId(newDataId);
  };

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '40px auto',
        padding: '0 20px',
      }}
    >
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
          Financial Management
        </h1>
        <p style={{ color: '#475569' }}>
          Upload your financial data and get instant insights.
        </p>
      </div>

      {/* Upload Section */}
      <section
        style={{
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)',
          marginBottom: '36px',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>
          Upload Financial File
        </h2>
        <UploadForm userId={userId} onUploadSuccess={handleUploadSuccess} />
      </section>

      {/* Analysis Section */}
      {currentDataId ? (
        <section
          style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>
            Latest Analysis
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              color: '#64748b',
              marginBottom: '20px',
            }}
          >
            Analysis ID: <strong>{currentDataId}</strong>
          </p>

          <AnalysisDashboard dataId={currentDataId} />
        </section>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 20px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px dashed #cbd5e1',
            color: '#64748b',
          }}
        >
          <p style={{ fontSize: '1rem' }}>
            No analysis available yet.
          </p>
          <p style={{ fontSize: '0.9rem', marginTop: '6px' }}>
            Upload a financial file to view insights and reports.
          </p>
        </div>
      )}
    </div>
  );
}

export default FinancialPage;
