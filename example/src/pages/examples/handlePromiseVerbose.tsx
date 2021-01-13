import React, { useState } from 'react';

import { NextSeo } from 'next-seo';
import { Text } from '~/components';
import { handlePromiseVerbose } from '@storyofams/react-helpers';

const HandlePromiseVerbose = () => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  const successClick = async () => {
    const { data } = await handlePromiseVerbose(
      () =>
        new Promise<string>((resolve) => {
          setTimeout(() => resolve('Success'), 300);
        }),
      console.log,
      {
        successMessage: 'Success message broadcasted!',
        showSuccess: true,
      },
    );

    setData(data);

    if (error) {
      setError(undefined);
    }
  };

  const errorClick = async () => {
    const { error } = await handlePromiseVerbose(
      () =>
        new Promise<void>((_, reject) => {
          setTimeout(() => reject('Error'), 300);
        }),
      console.log,
      {
        errorMessage: 'Success message broadcasted!',
        showError: true,
      },
    );

    setError(error);

    if (data) {
      setData(undefined);
    }
  };

  return (
    <>
      <NextSeo
        title="handlePromiseVerbose"
        description="This is the example page for handlePromiseVerbose"
      />
      <Text>
        Check the developer tools for logging (console.log is used as
        toastHandler in this example)
      </Text>
      <Text>data: {data ?? '-'}</Text>
      <Text>error: {error ?? '-'}</Text>
      <Text></Text>
      <button onClick={successClick}>success click</button>
      <button onClick={errorClick}>error click</button>
    </>
  );
};
export default HandlePromiseVerbose;
