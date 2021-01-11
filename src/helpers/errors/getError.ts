import { get } from 'lodash';

export const errorLocations = {
  graphQL: 'response.errors',
  axios: 'response.data.message',
  status: 'err.status',
  default: 'err.response.data',
};

export const getError = (
  err: any,
  type: keyof typeof errorLocations = 'default',
  fallbackMsg: string = 'An unknown error has occurred',
) => {
  const errorLocation = errorLocations[type];

  let message = get(err, errorLocation, fallbackMsg);

  if (Array.isArray(message)) {
    message = message[0]?.message || message[0];
  }

  return message;
};
