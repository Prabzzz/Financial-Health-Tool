import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import AnalysisDashboard from '../components/AnalysisDashboard';

function FinancialPage() {
  const [userId] = useState(1);
  const [dataId, setDataId] = useState(null);

  return (
    <div className="workspace">
      <header className="workspace-header">
        <h1>Financial Workspace</h1>
        <span>{dataId ? 'Analysis Ready' : 'Waiting for upload'}</span>
      </header>

      <div className="workspace-body">
        <aside className="sidebar">
          <h3>Upload Data</h3>
          <UploadForm
            userId={userId}
            onUploadSuccess={(id) => setDataId(id)}
          />
        </aside>

        <main className="content">
          {dataId ? (
            <AnalysisDashboard dataId={dataId} />
          ) : (
            <div className="empty">
              <h2>No data yet</h2>
              <p>Upload a financial file to begin analysis.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default FinancialPage;
