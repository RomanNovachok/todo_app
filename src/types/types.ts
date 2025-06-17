export interface Board {
    id: string;
    name: string;
}
  
export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'ToDo' | 'InProgress' | 'Done';
}
  