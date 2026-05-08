import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card p-6 flex flex-col items-center gap-4 text-center">
          <div className="text-4xl">⚠️</div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-white">Something went wrong</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => {
              this.setState({ hasError: false, error: null })
              if (this.props.onRetry) this.props.onRetry()
            }}
          >
            🔄 Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
