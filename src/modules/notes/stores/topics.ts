import { uid } from 'quasar';
import { defineStore } from 'pinia';

export interface Topic {
  id: string;
  name: string;
}

export interface State {
  topics: Topic[];
}

export const createTopic = (name: string): Topic => ({
  id: uid(),
  name,
});

export const useTopicsStore = defineStore('topics', {
  persist: true,
  state(): State {
    return {
      topics: [],
    };
  },
  getters: {
    hasTopics(state: State) {
      return state.topics.length > 0;
    },
  },
  actions: {
    addTopic(name: string) {
      const isAlreadyExist = this.topics.find((topic) => topic.name === name);

      if (isAlreadyExist) throw new Error('Topic with such name is already exist');

      const topic = createTopic(name);

      this.topics = [...this.topics, topic];
    },
    deleteTopic(id: string) {
      this.topics = this.topics.filter((topic) => topic.id !== id);
    },
  },
});
