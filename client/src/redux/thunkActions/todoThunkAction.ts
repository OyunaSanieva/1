import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService';
import type { TodoType } from '../../types/todoTypes';

export const fetchTodosThunk = createAsyncThunk<TodoType[]>('todos/fetchAll', async () => {
  const todos = await apiService.getTodos();
  return todos;
});

export const deleteTodoThunk = createAsyncThunk<number, number>('todos/delete', async (id) => {
  await apiService.deleteTodo(id);
  return id;
});

export const changeTodoStatusThunk = createAsyncThunk<TodoType, number>(
  'todo/updateStatus',
  async (id) => {
    const todo = await apiService.changeTodoStatus(id);
    return todo;
  },
);

export const updateTodoThunk = createAsyncThunk<
  TodoType, { id: number; updatedTodo: TodoType['todo'] }>('todo/update', async ({ id, updatedTodo }) => {
  const updated = await apiService.updateTodo(id, updatedTodo);
  return updated;
});



export const addTodoThunk = createAsyncThunk<TodoType, string>(
  'todos/add', // Уникальное строковое значение для идентификации этого action
  async (newTodoText: string) => { // Принимает текст новой задачи в качестве аргумента
    const newTodo = await apiService.addTodo(newTodoText); // Вызываем метод для добавления задачи через сервис API
    return newTodo; // Возвращаем добавленную задачу
  }
);