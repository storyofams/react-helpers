import React, { useState } from 'react';

import { NextSeo } from 'next-seo';
import { Text } from '~/components';
import { handlePromise } from '@storyofams/react-helpers';

const HandlePromiseExample = () => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  const successClick = async () => {
    const { data } = await handlePromise(
      () =>
        new Promise<string>((resolve) => {
          setTimeout(() => resolve('Success'), 300);
        }),
    );

    setData(data);

    if (error) {
      setError(undefined);
    }
  };

  const errorClick = async () => {
    const { error } = await handlePromise(
      () =>
        new Promise<void>((_, reject) => {
          setTimeout(() => reject('Error'), 300);
        }),
    );

    setError(error);

    if (data) {
      setData(undefined);
    }
  };

  return (
    <>
      <NextSeo
        title="handlePromise"
        description="This is the example page for handlePromise"
      />
      <Text>data: {data ?? '-'}</Text>
      <Text>error: {error ?? '-'}</Text>
      <button onClick={successClick}>success click</button>
      <button onClick={errorClick}>error click</button>
    </>
  );
};
export default HandlePromiseExample;
