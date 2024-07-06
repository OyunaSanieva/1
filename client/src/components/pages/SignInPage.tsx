import { FormControl, FormLabel, Box, Stack, Input, Button } from '@chakra-ui/react';
import React from 'react';
import { useAppDispatch } from '../../hooks/useReduxHooks';
import type { UserSignInType } from '../../types/authTypes';
import { signInThunk } from '../../redux/thunkActions/authThunkAction';

export default function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {

    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget)) as UserSignInType;

    if (data.email && data.password) {
      void dispatch(signInThunk(data));
    }
  };

  return (
    <Box mt={10} display="flex" justifyContent="center">
        <Box  w="50%">
          <Stack spacing={3}>
            <h2>Sign In</h2>
        <form onSubmit={submitHandler}>

            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
          <Button  mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
    </form>
          </Stack>
        </Box>
      </Box>
  );
}
