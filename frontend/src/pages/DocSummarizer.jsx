import React, { useState, useRef } from 'react';
import { UploadCloud, File, FileText, Loader2, RefreshCw } from 'lucide-react';
import Markdown from 'react-markdown';

export default function DocSummarizer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSummary('');
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setSummary('');
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSummarize = async () => {
    if (!file) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await fetch('https://student-ai-platform-bnnh.vercel.app/api/summarize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to summarize document');

      const result = await response.json();
      setSummary(result.summary);
    } catch (err) {
      setError('An error occurred during summarization. Ensure the backend server is running and the file is valid text/pdf.');
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setSummary('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="animate-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Smart Document Summarizer</h2>
        <p style={{ color: 'var(--text-muted)' }}>Upload your lectures, PDFs, or study guides and let AI extract the key takeaways.</p>
      </div>

      {!summary ? (
        <div className="glass-card animate-in delay-100">
          {!file ? (
            <div
              className="dropzone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current.click()}
            >
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your document here</h3>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Supports .pdf, .txt, .md, .docx</p>
              <button className="btn-secondary" style={{ marginTop: '1.5rem' }}>Browse Files</button>
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <File style={{ width: '64px', height: '64px', color: 'var(--brand-secondary)', margin: '0 auto 1.5rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>{file.name}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{(file.size / 1024).toFixed(2)} KB</p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={clearFile} className="btn-secondary" disabled={loading}>
                  Cancel
                </button>
                <button onClick={handleSummarize} className="btn-primary" disabled={loading}>
                  {loading ? <><Loader2 className="spinner" /> Synthesizing...</> : 'Generate Summary'}
                </button>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept=".pdf,.txt,.md,.csv,.json"
          />
        </div>
      ) : (
        <div className="glass-card animate-in delay-200" style={{ padding: '2rem 3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--brand-secondary)' }}>Summary Result</h3>
            <button onClick={clearFile} className="btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }} title="Summarize another document">
              <RefreshCw size={16} /> New Form
            </button>
          </div>
          <div className="markdown-content">
            <Markdown>{summary}</Markdown>
          </div>
        </div>
      )}

      {error && (
        <div style={{ padding: '1rem', background: 'rgba(255, 0, 0, 0.1)', color: '#ff6b6b', borderRadius: '8px', textAlign: 'center', marginTop: '1.5rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}
