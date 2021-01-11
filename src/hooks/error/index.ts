import { useRef, useReducer } from 'react';

import { createErrorBoundary, UseErrorBoundaryWrapper } from './create';

export interface ErrorState {
  didCatch: boolean;
  error: any | null;
}

export interface UseErrorBoundaryState extends ErrorState {
  ErrorBoundary: UseErrorBoundaryWrapper;
}

interface StateAction {
  type: 'catch';
  error?: any | null;
}

export interface UseErrorBoundaryOptions {
  onDidCatch?: (error: any, errorInfo: any) => void;
}

type UseErrorBoundaryReducer = (
  state: ErrorState,
  action: StateAction,
) => ErrorState;

const useErrorBoundaryReducer: UseErrorBoundaryReducer = (state, action) => {
  switch (action.type) {
    case 'catch':
      return {
        ...state,
        didCatch: true,
        error: action.error,
      };
    default:
      throw Error('Action was not specified');
  }
};

export function useErrorBoundary(
  options?: UseErrorBoundaryOptions,
): UseErrorBoundaryState {
  const [state, dispatch] = useReducer<UseErrorBoundaryReducer>(
    useErrorBoundaryReducer,
    {
      didCatch: false,
      error: undefined,
    },
  );

  const errorBoundaryWrapperRef = useRef<UseErrorBoundaryWrapper | null>(null);

  function getWrappedErrorBoundary() {
    let errorBoundaryWrapper = errorBoundaryWrapperRef.current;

    if (errorBoundaryWrapper !== null) {
      return errorBoundaryWrapper;
    }

    errorBoundaryWrapper = createErrorBoundary((err, errorInfo) => {
      dispatch({
        type: 'catch',
        error: err,
      });

      if (options && options.onDidCatch) {
        options.onDidCatch(err, errorInfo);
      }
    });

    errorBoundaryWrapperRef.current = errorBoundaryWrapper;

    return errorBoundaryWrapper;
  }

  return {
    ErrorBoundary: getWrappedErrorBoundary(),
    didCatch: state.didCatch,
    error: state.error,
  };
}
