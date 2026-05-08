import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6 text-slate-900 dark:bg-slate-950 dark:text-white">
          <div className="max-w-md rounded-md border border-slate-200 bg-white p-6 text-center shadow-panel dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-xl font-semibold">Something went off course</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              The dashboard hit an unexpected error. Retry to reload the app state.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
