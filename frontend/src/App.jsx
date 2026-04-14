import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Search, FileText } from 'lucide-react';
import Home from './pages/Home';
import TopicSearch from './pages/TopicSearch';
import DocSummarizer from './pages/DocSummarizer';

function Navigation() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen />
          Student AI
        </span>
      </Link>
      <div className="nav-links">
        <Link to="/search" className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}>
           Search Topic
        </Link>
        <Link to="/summarizer" className={`nav-link ${location.pathname === '/summarizer' ? 'active' : ''}`}>
           Summarize Doc
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="layout-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<TopicSearch />} />
            <Route path="/summarizer" element={<DocSummarizer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
