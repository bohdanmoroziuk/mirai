import { setActivePinia, createPinia } from 'pinia';
import {
  beforeEach,
  describe,
  expect,
  jest,
  it,
} from '@jest/globals';

import { groupsService } from 'src/modules/tools';
import { useGroupsStore } from 'src/modules/tools/stores/groups';

const mockGroups = [
  {
    id: '1',
    name: 'React',
  },
  {
    id: '2',
    name: 'Vue',
  },
];

jest.mock('src/modules/tools', () => ({
  groupsService: {
    getGroups: jest.fn().mockImplementation(() => Promise.resolve(mockGroups)),
    addGroup: jest.fn().mockImplementation(() => Promise.resolve()),
    deleteGroup: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}));

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('useGroupsStore', () => {
  it('receives groups from the storage', async () => {
    const store = useGroupsStore();

    expect(store.groups.length).toBe(0);

    await store.getGroups();

    expect(store.groups.length).toBe(mockGroups.length);
    expect(groupsService.getGroups).toHaveBeenCalled();
  });

  it('adds a new group', async () => {
    const store = useGroupsStore();

    const mockGroupName = 'Quasar';

    await store.addGroup(mockGroupName);

    expect(store.groups.length).toBe(1);
    expect(store.groups[0].name).toBe(mockGroupName);
    expect(groupsService.addGroup).toHaveBeenCalled();
  });

  it('deletes the group with the given id', async () => {
    const store = useGroupsStore();

    await store.getGroups();

    expect(store.groups.find((group) => group.id === mockGroups[0].id)).not.toBe(undefined);

    await store.deleteGroup(mockGroups[0].id);

    expect(store.groups.find((group) => group.id === mockGroups[0].id)).toBe(undefined);
    expect(groupsService.deleteGroup).toHaveBeenCalled();
  });
});
