import React, { useState } from 'react';
import { Search, Loader2, PlayCircle, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';

export default function TopicSearch() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleTopicChange = (e) => {
    const val = e.target.value;
    setTopic(val);
    if (val.trim() === '') {
      setData(null);
      setError('');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });

      if (!response.ok) throw new Error('Failed to fetch data');

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Something went wrong. Make sure the backend server is running and the API key is valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in">
      <div className="search-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Find Your Topic</h2>
          <p style={{ color: 'var(--text-muted)' }}>Enter any subject or topic to instantly generate beautiful, structured notes and highly-rated video recommendations.</p>
        </div>

        <form onSubmit={handleSearch} className="search-box glass-card animate-in delay-100" style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
          <Search style={{ color: 'var(--text-muted)', alignSelf: 'center', marginLeft: '0.5rem' }} />
          <input 
            type="text" 
            placeholder="e.g., Quantum Physics, React Hooks, Cellular Respiration..." 
            className="input-primary" 
            value={topic}
            onChange={handleTopicChange}
            style={{ border: 'none', background: 'transparent', flexGrow: 1 }}
          />
          <button type="submit" className="btn-primary" disabled={loading || !topic.trim()}>
            {loading ? <Loader2 className="spinner" /> : 'Search'}
          </button>
        </form>

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(255, 0, 0, 0.1)', color: '#ff6b6b', borderRadius: '8px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {data && (
          <div className="animate-in delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {data.recommendedVideos && data.recommendedVideos.length > 0 && (
              <div>
                <h3 style={{ marginBottom: '1rem' }}>Recommended Videos</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  {data.recommendedVideos.map((video, idx) => (
                    <a 
                      key={idx} 
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.query || video.title)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="video-link-card"
                    >
                      <PlayCircle className="video-icon" />
                      <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{video.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Watch on YouTube</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="glass-card" style={{ padding: '2rem 3rem' }}>
               <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem', color: 'var(--brand-primary)' }}>
                 Generated Notes
               </h3>
               <div className="markdown-content">
                 <Markdown>{data.notes}</Markdown>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
