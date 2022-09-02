import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import {
  beforeEach,
  describe,
  expect,
  jest,
  it,
} from '@jest/globals';
import { mount } from '@vue/test-utils';

import { openExternalUrl } from 'src/utils';
import { ToolCard } from 'src/modules/tools';

installQuasarPlugin();

const mockTool = {
  id: '43rfdsfdsfdfsdf',
  name: 'React Official Website',
  url: 'https://uk.reactjs.org/',
};

jest.mock('src/utils', () => ({
  openExternalUrl: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ToolCard', () => {
  it('renders successfully', () => {
    const wrapper = mount(ToolCard, {
      props: {
        tool: mockTool,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = mount(ToolCard, {
      props: {
        tool: mockTool,
      },
    });

    expect(wrapper.text()).toContain(mockTool.name);
  });

  it('opens the url on click', async () => {
    const wrapper = mount(ToolCard, {
      props: {
        tool: mockTool,
      },
    });

    await wrapper.trigger('click');

    expect(openExternalUrl).toHaveBeenCalledWith(mockTool.url);
  });
});
