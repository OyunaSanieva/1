import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import AppSpinner from '../AppSpinner';
import TodoItem from './TodoItem';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHooks';
import {
  changeTodoStatusThunk,
  fetchTodosThunk,
} from '../../../redux/thunkActions/todoThunkAction';

export default function TodoList(): JSX.Element {
  const todos = useAppSelector((state) => state.todos);
  console.log(todos);
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(fetchTodosThunk());
  }, []);
  const changeStatusHandler = (id: number): void => {
    void dispatch(changeTodoStatusThunk(id));
  };

  return (
    <Box mt={2} p={5} rounded="md">
      <h1 style={{ textAlign: 'center' }}>Todo List</h1>

      {todos.status === 'fetching' ? (
        <AppSpinner />
      ) : (
        <>
          <h2>Это будем делать :с</h2>

          {todos.data
            .filter((el) => !el.isDone)
            .map((el) => (
              <TodoItem key={el.id} todo={el} changeStatusHandler={changeStatusHandler} />
            ))}
          <h2>Ура, мы это сделали с:</h2>
          {todos.data
            .filter((el) => el.isDone)
            .map((el) => (
              <TodoItem key={el.id} todo={el} changeStatusHandler={changeStatusHandler} />
            ))}
        </>
      )}
    </Box>
  );
}
