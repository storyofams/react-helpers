import React from 'react';

import { Box, Stack, Text, Link } from '~/components';

export const Navigation = () => {
  return (
    <Box minHeight="100vh" backgroundColor="grey600" p={2}>
      <Text mb={4} borderBottom="1px solid" borderColor="grey600">
        @storyofams/react-helpers
      </Text>
      <Link to="/">
        <Text mb={2} borderBottom="1px solid" borderColor="grey600">
          All examples
        </Text>
      </Link>
      <Stack space={2} flexDir="column">
        <Link to="/examples/useBoolean">useBoolean</Link>
        <Link to="/examples/useArray">useArray</Link>
        <Link to="/examples/useErrorBoundary">useErrorBoundary</Link>
        <Link to="/examples/useOnClickOutside">useOnClickOutside</Link>
        <Link to="/examples/handlePromise">handlePromise</Link>
        <Link to="/examples/handlePromiseVerbose">handlePromiseVerbose</Link>
      </Stack>
    </Box>
  );
};
