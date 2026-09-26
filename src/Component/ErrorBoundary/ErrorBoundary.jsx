import { Component } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";
import styles from "./ErrorBoundary.module.scss";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className={styles.errorContainer} role="alert">
          <div className={styles.errorCard}>
            <div className={styles.iconWrap}>
              <AlertTriangle size={32} />
            </div>
            <h2>Unable to load page content</h2>
            <p>
              A momentary network or asset update occurred while loading this section.
            </p>
            <button
              type="button"
              className={styles.reloadBtn}
              onClick={this.handleReload}
            >
              <RefreshCw size={16} />
              <span>Reload Section</span>
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
