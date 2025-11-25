import React, { useState, useEffect } from 'react';
import JsonViewer from './components/JsonViewer';
import AdUnit from './components/AdUnit';
import { parseJSON } from './utils/jsonParser';

function App() {
  const [jsonInput, setJsonInput] = useState('{\n  "welcome": "To Ultimate JSON Visualizer",\n  "features": [\n    "Fast Parsing",\n    "Collapsible Nodes",\n    "Premium UI"\n  ],\n  "isAwesome": true,\n  "stats": {\n    "users": 1000,\n    "rating": 5.0\n  }\n}');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);
  const [isMinified, setIsMinified] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [wasAutoFixed, setWasAutoFixed] = useState(false);

  useEffect(() => {
    if (!jsonInput.trim()) {
      setParsedData(null);
      setError(null);
      setWasAutoFixed(false);
      return;
    }

    const result = parseJSON(jsonInput);
    if (result.success) {
      setParsedData(result.data);
      setError(null);
      setWasAutoFixed(result.fixed);

      // If auto-fixed, update the input to show the fixed version
      if (result.fixed) {
        setJsonInput(JSON.stringify(result.data, null, 2));
      }
    } else {
      setError(result.error);
      setWasAutoFixed(false);
    }
  }, [jsonInput]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonInput);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonInput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFormatToggle = () => {
    if (!parsedData) return;

    if (isMinified) {
      // Format (pretty print)
      setJsonInput(JSON.stringify(parsedData, null, 2));
      setIsMinified(false);
    } else {
      // Minify
      setJsonInput(JSON.stringify(parsedData));
      setIsMinified(true);
    }
  };

  return (
    <>
      <header className="app-header">
        <div className="container header-content">
          <div className="logo">JSON VISUALIZER PRO</div>
          <div className="actions">
            <button className="btn" onClick={handleCopy} title="Copy to clipboard">
              {copySuccess ? '✓ Copied!' : '📋 Copy'}
            </button>
            <button className="btn" onClick={handleDownload} style={{ marginLeft: '0.5rem' }} title="Download as file">
              ⬇️ Download
            </button>
            <button
              className="btn"
              onClick={handleFormatToggle}
              style={{ marginLeft: '0.5rem' }}
              disabled={!parsedData}
              title={isMinified ? 'Format JSON' : 'Minify JSON'}
            >
              {isMinified ? '📐 Format' : '🗜️ Minify'}
            </button>
            <button className="btn" onClick={() => setJsonInput('')} style={{ marginLeft: '0.5rem' }}>
              🗑️ Clear
            </button>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <div className="split-view">
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Input</span>
              {wasAutoFixed && <span style={{ color: 'var(--success)', fontSize: '0.8rem' }}>✓ Auto-fixed</span>}
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
