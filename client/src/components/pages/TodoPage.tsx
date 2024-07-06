import { Box } from '@chakra-ui/react';
import React from 'react';
import TodoForm from '../ui/todoUi/TodoForm';
import TodoList from '../ui/todoUi/TodoList';
import { useAppSelector } from '../../hooks/useReduxHooks';

export default function TodoPage(): JSX.Element {
  const status = useAppSelector(state => state.auth.user.status)

  if(status !== 'logged') {
    return (
      <h1>Чтобы увидеть тудушки, зарегайтесь пж :D
      </h1>
    )
  }
  return (
    <Box>
      <TodoForm />
      <TodoList />
    </Box>
  );
}
