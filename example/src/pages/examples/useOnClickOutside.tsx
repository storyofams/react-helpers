import React, { useRef } from 'react';

import { NextSeo } from 'next-seo';
import { Box } from '~/components';
import { useOnClickOutside } from '@storyofams/react-helpers';

const handler = () => console.log('Clicked outside the greenzone');

const UseOnClickOutside = () => {
  const ref = useRef(undefined);
  useOnClickOutside(ref, handler);

  return (
    <>
      <NextSeo
        title="useOnClickOutside"
        description="This is the example page for useOnClickOutside"
      />
      <Box p={4} bg="error100">
        <Box ref={ref} bg="success100" p={4}>
          Clicking here does nothing (check the developer console)
        </Box>
      </Box>
    </>
  );
};
export default UseOnClickOutside;
