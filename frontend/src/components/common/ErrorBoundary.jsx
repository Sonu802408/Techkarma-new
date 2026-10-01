import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem', 
                    textAlign: 'center', 
                    background: 'var(--bg-secondary, #f8f9fa)', 
                    borderRadius: '12px',
                    margin: '2rem 0',
                    border: '1px solid var(--border-color, #e9ecef)'
                }}>
                    <h3 style={{ color: 'var(--danger-color, #dc3545)', marginBottom: '1rem' }}>
                        Notes currently unavailable
                    </h3>
                    <p style={{ color: 'var(--text-secondary, #6c757d)', marginBottom: '1.5rem' }}>
                        We encountered an issue loading this specific content. Please try another subject or medium.
                    </p>
                    <button 
                        onClick={() => this.setState({ hasError: false })}
                        style={{
                            padding: '0.6rem 1.2rem',
                            background: 'var(--primary-color, #0d6efd)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 600
                        }}
                    >
                        Try Again
                    </button>
                    {this.props.fallback}
                </div>
            );
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
