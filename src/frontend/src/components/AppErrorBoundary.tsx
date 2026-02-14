import { Component, type ReactNode, type ErrorInfo } from 'react';
import { ActionableError } from './ActionableError';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ActionableError
          title="Something went wrong"
          message="An unexpected error occurred while loading the application."
          actionLabel="Refresh Page"
          onAction={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}
