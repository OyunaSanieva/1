export type TodoType = {
  id: number;
  todo: string;
  isDone: boolean;
};

export type TodoState = {
  status: 'fetching' | 'idle' | 'error';
  data: TodoType[];
};

