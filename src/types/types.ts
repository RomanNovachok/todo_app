export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'ToDo' | 'InProgress' | 'Done';
}
  
export interface Board {
    id: string;
    name: string;
    columns: Record<string, Task[]>;
}
  