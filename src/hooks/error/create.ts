import React from 'react';

import {
  ErrorBoundary,
  ErrorBoundaryProps,
  OnDidCatchCallback,
} from './boundaries';

export type UseErrorBoundaryWrapper = (
  props: Omit<ErrorBoundaryProps, 'onDidCatch'>,
) => React.ReactElement;

export function createErrorBoundary(
  onDidCatch: OnDidCatchCallback,
): UseErrorBoundaryWrapper {
  return function UseErrorBoundaryWrapper(props) {
    return React.createElement<ErrorBoundaryProps>(ErrorBoundary, {
      onDidCatch,
      children: props.children,
      render: props.render,
      renderError: props.renderError,
    });
  };
}
