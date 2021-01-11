import { getError, errorLocations } from '~helpers/errors';

type State<T> = { data?: T; error?: any };

type OptionProps = {
  /** defaults to true */
  showSuccess?: boolean;
  /** defaults to true */
  showError?: boolean;
  /** defaults to 'Success' */
  successMessage?: string;
  /** defaults to error if it's there or otherwise 'Something went wrong' */
  errorMessage?: string;
  errorType?: keyof typeof errorLocations;
};

const defaultOptionProps = {
  showError: true,
  showSuccess: true,
  successMessage: 'Success!',
  errorMessage: 'Something went wrong!',
  errorType: 'default',
} as OptionProps;

/** @todo implement promise handler that also handles toasts */

export function handlePromiseVerbose<T>(
  promise: () => Promise<T>,
  toastHandler: (msg: string, type: 'success' | 'error' | 'danger') => void,
  customOptions: OptionProps = {},
): Promise<State<T>> {
  if (typeof promise !== 'function') {
    throw Error('Promise needs to be a function');
  }

  const { showError, showSuccess, successMessage, errorMessage, errorType } = {
    ...defaultOptionProps,
    ...customOptions,
  };

  return promise()
    .then((data) => {
      if (showSuccess && toastHandler) {
        toastHandler(successMessage, 'success');
      }

      return { data, error: undefined };
    })
    .catch((error) => {
      if (showError && toastHandler) {
        toastHandler(getError(error, errorType, errorMessage), 'error');
      }

      return { data: undefined, error };
    });
}
