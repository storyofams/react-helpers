import { handlePromise } from '~helpers';

const successObject = {
  id: 'test-id',
  name: 'test-name',
};

const successPromise = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(successObject), 10);
  });

const errorPromise = () =>
  new Promise(() => {
    throw Error('Not resolved');
  });

describe('[helpers](handlePromise)', () => {
  test('it should return data', async () => {
    const { error, data } = await handlePromise(() => successPromise());

    expect(error).toBe(undefined);
    expect(data).toEqual(successObject);
  });

  test('it should return error', async () => {
    const { error, data } = await handlePromise(() => errorPromise());

    expect(error).toEqual(Error('Not resolved'));
    expect(data).toEqual(undefined);
  });

  test('it should return error', async () => {
    // @ts-expect-error
    expect(() => handlePromise('foo')).toThrow(
      Error('Promise needs to be a function'),
    );
  });
});
