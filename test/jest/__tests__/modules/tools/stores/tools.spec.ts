import { setActivePinia, createPinia } from 'pinia';
import {
  beforeEach,
  describe,
  expect,
  jest,
  it,
} from '@jest/globals';

import { toolsService } from 'src/modules/tools';
import { useToolsStore } from 'src/modules/tools/stores/tools';

const mockTools = [
  {
    id: '1',
    name: 'React',
    url: 'https://uk.reactjs.org/',
  },
  {
    id: '2',
    name: 'Vue',
    url: 'https://vuejs.org/',
  },
];

jest.mock('src/modules/tools', () => ({
  toolsService: {
    getTools: jest.fn().mockImplementation(() => Promise.resolve(mockTools)),
    addTool: jest.fn().mockImplementation(() => Promise.resolve()),
    deleteTool: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}));

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('useToolsStore', () => {
  it('receives tools from the storage', async () => {
    const store = useToolsStore();

    expect(store.tools.length).toBe(0);

    await store.getTools();

    expect(store.tools.length).toBe(mockTools.length);
    expect(toolsService.getTools).toHaveBeenCalled();
  });

  it('adds a new tool', async () => {
    const store = useToolsStore();

    const mockToolBody = {
      name: 'Quasar',
      url: 'https://quasar.dev/',
    };

    await store.addTool(mockToolBody);

    expect(store.tools.length).toBe(1);
    expect(store.tools[0].name).toBe(mockToolBody.name);
    expect(store.tools[0].url).toBe(mockToolBody.url);
    expect(toolsService.addTool).toHaveBeenCalled();
  });

  it('deletes the tool with the given id', async () => {
    const store = useToolsStore();

    await store.getTools();

    expect(store.tools.find((tool) => tool.id === mockTools[0].id)).not.toBe(undefined);

    await store.deleteTool(mockTools[0].id);

    expect(store.tools.find((tool) => tool.id === mockTools[0].id)).toBe(undefined);
    expect(toolsService.deleteTool).toHaveBeenCalled();
  });
});
