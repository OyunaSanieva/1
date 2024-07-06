import {
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Input,
  InputGroup,
  Button,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { addTodoThunk } from '../../../redux/thunkActions/todoThunkAction';
import { useAppDispatch } from '../../../hooks/useReduxHooks';

export default function TodoForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [todoText, setTodoText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void dispatch(addTodoThunk(todoText)); // Передаем текст новой задачи в функцию addTodoThunk
    setTodoText(''); // Очищаем поле ввода после отправки
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTodoText(event.target.value); // Обновляем состояние todoText при изменении поля ввода
  };

  return (
    <Box mt="2">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Добавь тудушку</FormLabel>
          <InputGroup size="md">
            <Input type="text" name="todo" value={todoText} onChange={handleChange} />
            <InputRightElement width="6rem">
              <Button h="1.95rem" variant="outline" type="submit">
                Submit
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
}
