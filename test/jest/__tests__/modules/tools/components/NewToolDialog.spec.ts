import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import {
  describe,
  expect,
  it,
} from '@jest/globals';
import { mount } from '@vue/test-utils';
import { QCard } from 'quasar';

import { NewToolDialog } from 'src/modules/tools';

installQuasarPlugin();
describe('NewToolDialog', () => {
  it('adds a new tool', async () => {
    const mockToolBody = {
      name: 'React',
      url: 'https://uk.reactjs.org/',
    };

    const wrapper = mount(NewToolDialog);

    await wrapper.find('button').trigger('click');

    const card = wrapper.getComponent(QCard);

    await card.find('[aria-label="Name"]').setValue(mockToolBody.name);

    await card.find('[aria-label="Url"]').setValue(mockToolBody.url);

    await card.findAll('button')[1].trigger('click');

    expect(wrapper.emitted('add')).toEqual([[mockToolBody]]);
  });
});
