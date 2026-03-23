import React from 'react';

interface Props { children?: React.ReactNode; }
interface State { hasError: boolean; error?: Error; errorInfo?: React.ErrorInfo; }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false }; }
  
  static getDerivedStateFromError(error: Error): State { 
    return { hasError: true, error }; 
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { 
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({ error, errorInfo });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '20px', textAlign: 'center', color: 'red'}}>
          <h2>Something went wrong</h2>
          <details style={{whiteSpace: 'pre-wrap', textAlign: 'left', maxWidth: '800px', margin: '20px auto'}}>
            <summary style={{cursor: 'pointer', marginBottom: '10px'}}>Error Details (Click to expand)</summary>
            <p><strong>Error:</strong> {this.state.error?.toString()}</p>
            <p><strong>Stack:</strong></p>
            <pre style={{background: '#1a1a1a', padding: '10px', borderRadius: '4px', overflow: 'auto'}}>
              {this.state.error?.stack}
            </pre>
            {this.state.errorInfo && (
              <>
                <p><strong>Component Stack:</strong></p>
                <pre style={{background: '#1a1a1a', padding: '10px', borderRadius: '4px', overflow: 'auto'}}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </>
            )}
          </details>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
