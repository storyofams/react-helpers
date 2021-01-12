import React from 'react';

import { NextSeo } from 'next-seo';
import { useBoolean } from '@storyofams/react-helpers';

const UseBooleanExample = () => {
  const [bool, { toggle }] = useBoolean(false);
  return (
    <>
      <NextSeo
        title="useBoolean"
        description="This is the example page for useBoolean"
      />
      <button onClick={toggle}>{bool ? "Don't click me" : 'Click me'}</button>
    </>
  );
};
export default UseBooleanExample;
