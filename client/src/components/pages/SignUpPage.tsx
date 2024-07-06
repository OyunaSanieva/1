import React from 'react';
import { FormControl, FormLabel, Box, Stack, Input, Button } from '@chakra-ui/react';
import { signUpThunk } from '../../redux/thunkActions/authThunkAction';
import type { UserSignUpType } from '../../types/authTypes';
import { useAppDispatch } from '../../hooks/useReduxHooks';

export default function SignUpPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as UserSignUpType;
    void dispatch(signUpThunk(data));
  };
  return (
    <Box mt={10} display="flex" justifyContent="center">
      <Box w="50%">
          <Stack spacing={3}>
            <h2>Sign up</h2>
        <form onSubmit={submitHandler}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input type="name" name="username" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Submit
          </Button>
        </form>
          </Stack>
      </Box>
    </Box>
  );
}
