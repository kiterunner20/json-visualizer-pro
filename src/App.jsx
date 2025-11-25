import React, { useState, useEffect } from 'react';
import JsonViewer from './components/JsonViewer';
import AdUnit from './components/AdUnit';

function App() {
  const [jsonInput, setJsonInput] = useState('{\n  "welcome": "To Ultimate JSON Visualizer",\n  "features": [\n    "Fast Parsing",\n    "Collapsible Nodes",\n    "Premium UI"\n  ],\n  "isAwesome": true,\n  "stats": {\n    "users": 1000,\n    "rating": 5.0\n  }\n}');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!jsonInput.trim()) {
        setParsedData(null);
        setError(null);
        return;
      }
      const parsed = JSON.parse(jsonInput);
      setParsedData(parsed);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [jsonInput]);

  return (
    <>
      <header className="app-header">
        <div className="container header-content">
          <div className="logo">JSON VISUALIZER PRO</div>
          <div className="actions">
            <button className="btn" onClick={() => setJsonInput('')}>Clear</button>
            <button className="btn btn-primary" style={{ marginLeft: '1rem' }}>Format</button>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <div className="split-view">
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Input</span>
              {error && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>Invalid JSON</span>}
            </div>
            <textarea
              className="editor-textarea"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON here..."
              spellCheck="false"
            />
          </div>

          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Viewer</span>
            </div>
            <div className="viewer-content">
              {error ? (
                <div style={{ color: 'var(--error)' }}>
                  <p>Error parsing JSON:</p>
                  <pre style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{error}</pre>
                </div>
              ) : (
                <JsonViewer data={parsedData} />
              )}
            </div>
          </div>

          <div className="ad-viewer-sidebar">
            <AdUnit slotId="viewer-sidebar" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
