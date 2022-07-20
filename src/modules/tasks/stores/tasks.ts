import { defineStore } from 'pinia';

import { toSystemDate } from 'src/utils/date';
import { Task } from 'src/modules/tasks/types';

export interface State {
  tasks: Task[];
}

export const createTask = (name: string, description: string, dueDate: Date): Task => ({
  name,
  description,
  dueDate: toSystemDate(dueDate),
  createdAt: toSystemDate(new Date()),
  isCompleted: false,
});

export const useTasksStore = defineStore('tasks', {
  state(): State {
    return {
      tasks: [],
    };
  },
  getters: {},
  actions: {},
});
