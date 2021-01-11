import { PureComponent } from 'react';

export type OnDidCatchCallback = (error: any, errorInfo: any) => void;
export type ErrorBoundaryProps = {
  onDidCatch: OnDidCatchCallback;
  children?: React.ReactNode | JSX.Element;
  render?: () => React.ReactNode | JSX.Element;
  renderError?: (error: ErrorObject) => React.ReactNode | JSX.Element;
};

type ErrorObject = {
  error: any;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: any;
};

export class ErrorBoundary extends PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    return this.props.onDidCatch(error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { render, children, renderError } = this.props;

    if (hasError) {
      return renderError ? renderError({ error }) : null;
    }

    return render ? render() : children || null;
  }
}
