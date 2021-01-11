type State<T> = { data?: T; error?: any };

export function handlePromise<T>(promise: () => Promise<T>): Promise<State<T>> {
  if (typeof promise !== 'function') {
    throw Error('Promise needs to be a function');
  }

  return promise()
    .then((data) => ({ data, error: undefined }))
    .catch((error) => ({ data: undefined, error }));
}
