import { uid } from 'quasar';
import { defineStore } from 'pinia';

import {
  Tool,
  ToolId,
  ToolBody,
  toolsService,
} from 'src/modules/tools';

export interface ToolsStoreState {
  tools: Tool[];
  searchTerm: string,
}

export const createTool = (body: ToolBody): Tool => ({
  id: uid(),
  ...body,
});

export const useToolsStore = defineStore('tools', {
  persist: true,
  state: (): ToolsStoreState => ({
    tools: [],
    searchTerm: '',
  }),
  getters: {
    filteredTools(): Tool[] {
      const { tools, searchTerm } = this;

      if (tools.length === 0) return [];

      if (searchTerm.length === 0) return tools;

      const needle = searchTerm.toLowerCase();

      return tools.filter((tool) => (
        tool.name.toLowerCase().includes(needle)
      ));
    },
  },
  actions: {
    async getTools() {
      this.tools = await toolsService.getTools();
    },
    async addTool(body: ToolBody) {
      const tool = createTool(body);

      await toolsService.addTool(tool);

      this.tools = [tool, ...this.tools];
    },
    async deleteTool(id: ToolId) {
      await toolsService.deleteTool(id);

      this.tools = this.tools.filter((tool) => tool.id !== id);
    },
    setSearchTerm(value: string) {
      this.searchTerm = value;
    },
  },
});
