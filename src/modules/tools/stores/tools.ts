import { uid } from 'quasar';
import { defineStore } from 'pinia';

import { toolsService } from 'src/modules/tools';

export interface Tool {
  id: string;
  name: string;
  url: string;
}

export type ToolId = Tool['id'];

export type ToolBody = Omit<Tool, 'id'>;

export interface ToolsStoreState {
  tools: Tool[];
}

export const createTool = (body: ToolBody): Tool => ({
  id: uid(),
  ...body,
});

export const useToolsStore = defineStore('tools', {
  persist: true,
  state: (): ToolsStoreState => ({
    tools: [],
  }),
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
  },
});