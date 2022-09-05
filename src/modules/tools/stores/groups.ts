import { uid } from 'quasar';
import { defineStore } from 'pinia';

import {
  Group,
  GroupId,
  GroupName,
  groupsService,
} from 'src/modules/tools';

export interface GroupsStoreState {
  groups: Group[];
}

export const createGroup = (name: GroupName): Group => ({
  id: uid(),
  name,
});

export const useGroupsStore = defineStore('groups', {
  persist: true,
  state: (): GroupsStoreState => ({
    groups: [],
  }),
  actions: {
    async getGroups() {
      this.groups = await groupsService.getGroups();
    },
    async addGroup(name: GroupName) {
      const group = createGroup(name);

      await groupsService.addGroup(group);

      this.groups = [group, ...this.groups];
    },
    async deleteGroup(id: GroupId) {
      await groupsService.deleteGroup(id);

      this.groups = this.groups.filter((group) => group.id !== id);
    },
  },
});
