import React from 'react';

import { NextSeo } from 'next-seo';
import { Box, Flex, Text, Stack, Button } from '~/components';
import { useArray } from '@storyofams/react-helpers';

const UseArrayExample = () => {
  const [array, { add, remove }] = useArray([]);
  return (
    <>
      <NextSeo
        title="useArray"
        description="This is the example page for useArray"
      />
      <Flex>
        <Box>
          <Text>array length: ({array.length})</Text>
          <Stack space={2} flexDir="column">
            {array.map((i) => (
              <Box>
                <Text>{i}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box ml={4}>
          <Button onClick={() => add(array.length + 1)}>add</Button>
          <Button
            ml={2}
            onClick={() => remove(array.length - 1)}
            disabled={array.length === 0}
          >
            remove
          </Button>
        </Box>
      </Flex>
    </>
  );
};
export default UseArrayExample;
