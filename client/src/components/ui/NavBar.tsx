import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { logoutThunk } from '../../redux/thunkActions/authThunkAction';

export default function NavBar(): JSX.Element {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const logoutHandler = (): void => {
    void dispatch(logoutThunk());
  };
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={14} alignItems="center" justifyContent="space-between">
        <HStack spacing={10}>
        <Box>Привет, {user.status === 'logged' ? user.username : 'guest'}</Box>


          <Box as={NavLink} to="/">
            Тудушки
          </Box>
          
        </HStack>
        <HStack>
        {user.status !== 'logged' ? (
            <>
              <NavLink to="login" className={({ isActive }) => (isActive ? 'active' : '')}>
                signin
              </NavLink>
              <NavLink to="signup" className={({ isActive }) => (isActive ? 'active' : '')}>
                signup
              </NavLink>
            </>
          ) : (
            <Button onClick={logoutHandler}>Выйти</Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
