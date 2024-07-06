import { Box, Button, Checkbox, HStack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import type { TodoType } from '../../../types/todoTypes';
import { useAppDispatch } from '../../../hooks/useReduxHooks';
import { deleteTodoThunk, updateTodoThunk } from '../../../redux/thunkActions/todoThunkAction';

const MotionBox = motion(Box);

type TodoPropType = {
  todo: TodoType;
  changeStatusHandler: (id: number) => void;
};

export default function TodoItem({ todo, changeStatusHandler }: TodoPropType): JSX.Element {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  // const [editedTodo, setEditedTodo] = useState(todo.todo); // Состояние для хранения редактируемой задачи

  const handleDelete = (): void => {
    void dispatch(deleteTodoThunk(todo.id));
  };

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const saveEdit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const updateTodo = Object.fromEntries(new FormData(e.currentTarget)) as { todo: string };
    // Отправить изменения на сервер или обновить локальное состояние
    void dispatch(updateTodoThunk({ id: todo.id, updatedTodo: updateTodo.todo }));

    setIsEditing(false);
  };

  const cancelEdit = (): void => {
    setIsEditing(false);
    // setEditedTodo(todo.todo); // Вернуть исходное значение задачи
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setEditedTodo(e.currentTarget);
  // };

  return (
    <MotionBox
      mt={3}
      display="flex"
      justifyContent="space-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {isEditing ? (
        <form onSubmit={saveEdit}>
          <input type="text" name="todo" />
          <Button type="submit" variant="outline" colorScheme="green">
            Save
          </Button>
          <Button variant="outline" colorScheme="red" onClick={cancelEdit}>
            Cancel
          </Button>
        </form>
      ) : (
        <>
          <HStack spacing={7}>
            <Checkbox
              onChange={() => changeStatusHandler(todo.id)}
              isChecked={todo.isDone}
              size="lg"
              colorScheme="orange"
            />
            <Text fontSize="xl">{todo.todo}</Text>
          </HStack>
          <HStack spacing="5">
            <Button variant="outline" colorScheme="green" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="outline" colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </HStack>
        </>
      )}
    </MotionBox>
  );
}
