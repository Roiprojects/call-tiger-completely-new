import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Call Tiger UI Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn(e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#F6F3EC',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: '#121417',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '560px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #C9C1B2',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏛️</div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '2rem',
              fontWeight: 700,
              margin: '0 0 0.5rem 0',
              color: '#121417'
            }}>
              CALL TIGER — Application Notice
            </h1>
            <p style={{ fontSize: '0.92rem', color: '#43474E', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              A UI rendering refresh is needed. Click <strong>Reload Application</strong> below to reload with the latest updates.
            </p>
            {this.state.error && (
              <pre style={{
                textAlign: 'left',
                backgroundColor: '#FAF8F4',
                border: '1px solid #E3DDD1',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.78rem',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#C92A2A',
                overflowX: 'auto',
                marginBottom: '1.5rem'
              }}>
                {this.state.error.toString()}
              </pre>
            )}
            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  backgroundColor: '#B88028',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.4rem',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                ↻ Reload Application
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  backgroundColor: '#1E232E',
                  color: '#F6F3EC',
                  border: '1px solid #353D4D',
                  borderRadius: '8px',
                  padding: '0.75rem 1.4rem',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Reset Cache &amp; Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
