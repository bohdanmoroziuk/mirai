import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import {
  describe,
  expect,
  it,
} from '@jest/globals';
import { mount } from '@vue/test-utils';
import { QCard } from 'quasar';

import { NewGroupDialog } from 'src/modules/tools';

installQuasarPlugin();
describe('NewGroupDialog', () => {
  it('renders successfully', () => {
    const wrapper = mount(NewGroupDialog);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('adds a new group', async () => {
    const mockGroupName = 'React';

    const wrapper = mount(NewGroupDialog);

    await wrapper.find('button').trigger('click');

    const card = wrapper.findComponent(QCard);

    await card.find('[aria-label="Name *"]').setValue(mockGroupName);

    await card.findAll('button')[1].trigger('click');

    expect(wrapper.emitted('add')).toEqual([[mockGroupName]]);
    expect(card.exists()).toBeFalsy();
  });

  it('cancels the addition of a new group', async () => {
    const wrapper = mount(NewGroupDialog);

    await wrapper.find('button').trigger('click');

    const card = wrapper.findComponent(QCard);

    await card.find('[aria-label="Name *"]').setValue('React');

    await card.findAll('button')[0].trigger('click');

    expect(wrapper.emitted('add')).toBeUndefined();
    expect(card.exists()).toBeFalsy();
  });

  it('does not fire the add event if there are validation errors', async () => {
    const wrapper = mount(NewGroupDialog);

    await wrapper.find('button').trigger('click');

    const card = wrapper.getComponent(QCard);

    await card.find('[aria-label="Name *"]').setValue('');

    await card.findAll('button')[1].trigger('click');

    expect(card.text()).toContain('Enter a value');

    expect(wrapper.emitted('add')).toBe(undefined);
  });
});
