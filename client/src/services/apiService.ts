import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { TodoType } from '../types/todoTypes';
import axiosInstance from './apiInstance';

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
// });

class ApiService {
  constructor(private readonly apiInstance: AxiosInstance) {}

  public getTodos(): Promise<TodoType[]> {
    return this.apiInstance.get<TodoType[]>('/todo').then((res) => res.data);
  }

  public deleteTodo(id: number): Promise<void> {
    return this.apiInstance.delete(`/todo/${id}`);
  }

  public changeTodoStatus(id: number): Promise<TodoType> {
    return this.apiInstance.put<TodoType>(`/todo/${id}`).then((res) => res.data);
  }

  public updateTodo(id: number, updatedTodo: TodoType['todo']): Promise<TodoType> {
    return this.apiInstance.put<TodoType>(`/todo/${id}`, { updatedTodo }).then((res) => res.data);
  }

  public addTodo(newTodo: TodoType['todo']): Promise<TodoType> {
    return this.apiInstance.post<TodoType>('/todo', { todo: newTodo }).then((res) => res.data);
  }
}

export default new ApiService(axiosInstance);
