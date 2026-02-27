import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, info: null};
  }
  static getDerivedStateFromError(error) {
    return {error};
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({info});
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{padding:20,color:'#f00'}}>
          <h1>Se ha producido un error</h1>
          <pre>{this.state.error.toString()}</pre>
          <details style={{whiteSpace:'pre-wrap'}}>{this.state.info?.componentStack}</details>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
