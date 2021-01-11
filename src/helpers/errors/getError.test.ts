import { getError } from '~helpers';

const errorMsg = 'Four! Five! I mean Fire!!';
const fallbackMsg = 'An unknown error has occurred';

describe('[helpers](getError) graphQL', () => {
  test('it should return the error msg if array with object', () => {
    expect(
      getError({ response: { errors: [{ message: errorMsg }] } }, 'graphQL'),
    ).toBe(errorMsg);
  });

  test('it should return the error msg if array', () => {
    expect(getError({ response: { errors: [errorMsg] } }, 'graphQL')).toBe(
      errorMsg,
    );
  });

  test('it should return the fallback', () => {
    expect(getError({ response: { errors: undefined } }, 'graphQL')).toBe(
      fallbackMsg,
    );
  });
});

describe('[helpers](getError) axios / fetch', () => {
  test('it should return the error msg', () => {
    expect(
      getError({ response: { data: { message: errorMsg } } }, 'axios'),
    ).toBe(errorMsg);
  });

  test('it should return the fallback', () => {
    expect(
      getError({ response: { data: { message: undefined } } }, 'axios'),
    ).toBe(fallbackMsg);
  });
});

describe('[helpers](getError) status', () => {
  test('it should return the error msg', () => {
    expect(getError({ err: { status: errorMsg } }, 'status')).toBe(errorMsg);
  });

  test('it should return the fallback', () => {
    expect(getError({ err: { status: undefined } }, 'status')).toBe(
      fallbackMsg,
    );
  });
});

describe('[helpers](getError) default', () => {
  test('it should return the error msg', () => {
    expect(getError({ err: { response: { data: errorMsg } } })).toBe(errorMsg);
  });

  test('it should return the fallback', () => {
    expect(getError({ err: { response: { data: undefined } } })).toBe(
      fallbackMsg,
    );
  });
});
