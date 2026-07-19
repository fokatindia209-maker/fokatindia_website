import { Component, type ErrorInfo, type ReactNode } from "react";
import { recordException } from "../lib/crashReporting";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Catches render-phase errors app-wide, reports them to Crashlytics, and
// shows a recoverable screen instead of a blank white WebView.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    recordException(error, `React render: ${info.componentStack?.trim().split("\n")[0] ?? "unknown"}`);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-4 p-6 text-center bg-gray-50">
          <h1 className="text-xl font-bold text-gray-800">Something went wrong</h1>
          <p className="text-sm text-gray-500">
            Please restart the app. This issue has been reported.
          </p>
          <button
            onClick={this.handleReload}
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
