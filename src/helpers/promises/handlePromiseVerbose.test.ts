import { handlePromiseVerbose } from '~helpers';

const successObject = {
  id: 'test-id',
  name: 'test-name',
};

const mockLogger = jest.fn();

const successPromise = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(successObject), 10);
  });

const errorPromise = () =>
  new Promise(() => {
    throw Error('Not resolved');
  });

/** @todo extend the tests with custom error/success messages */

describe('[helpers](handlePromiseVerbose)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should return data and show toast', async () => {
    const { error, data } = await handlePromiseVerbose(
      () => successPromise(),
      mockLogger,
    );

    expect(mockLogger).toHaveBeenCalled();
    expect(error).toBe(undefined);
    expect(data).toEqual(successObject);
  });

  test('it should return data and should not show toast', async () => {
    const { error, data } = await handlePromiseVerbose(
      () => successPromise(),
      mockLogger,
      {
        showSuccess: false,
      },
    );

    expect(mockLogger).not.toHaveBeenCalled();
    expect(error).toBe(undefined);
    expect(data).toEqual(successObject);
  });

  test('it should return error and show toast', async () => {
    const { error, data } = await handlePromiseVerbose(
      () => errorPromise(),
      mockLogger,
    );

    expect(mockLogger).toHaveBeenCalled();
    expect(error).toEqual(Error('Not resolved'));
    expect(data).toEqual(undefined);
  });

  test('it should return error and should not show toast', async () => {
    const { error, data } = await handlePromiseVerbose(
      () => errorPromise(),
      mockLogger,
      {
        showError: false,
      },
    );

    expect(mockLogger).not.toHaveBeenCalled();
    expect(error).toEqual(Error('Not resolved'));
    expect(data).toEqual(undefined);
  });

  test('it should return error', async () => {
    // @ts-expect-error
    expect(() => handlePromiseVerbose('foo', mockLogger)).toThrow(
      Error('Promise needs to be a function'),
    );
  });
});
