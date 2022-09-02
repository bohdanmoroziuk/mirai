import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import {
  beforeEach,
  describe,
  expect,
  jest,
  it,
} from '@jest/globals';
import { mount, flushPromises } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import Tools from 'src/modules/tools/pages/Tools.vue';

installQuasarPlugin();

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

jest.mock('src/modules/tools/services/tools.ts', () => ({
  toolsService: {
    getTools: jest.fn().mockImplementation(() => Promise.resolve(mockTools)),
    addTool: jest.fn().mockImplementation(() => Promise.resolve()),
    deleteTool: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Tools', () => {
  it('renders successfully', async () => {
    const wrapper = mount(Tools, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });

    await flushPromises();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('displays a list of tools', async () => {
    const wrapper = mount(Tools, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain(mockTools[0].name);
    expect(wrapper.text()).toContain(mockTools[1].name);
  });
});
