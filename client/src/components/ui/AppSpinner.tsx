import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

export default function AppSpinner(): JSX.Element {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Box>
  );
}
