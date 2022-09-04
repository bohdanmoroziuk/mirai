import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
} from 'firebase/firestore';

import { firestore } from 'src/firebase';

import { Group, GroupId } from 'src/modules/tools';

export const GROUPS_COLLECTION_NAME = 'groups';

export const groupsService = {
  async getGroups() {
    const snapshot = await getDocs(collection(firestore, GROUPS_COLLECTION_NAME));

    const tools = snapshot.docs.map((doc) => doc.data() as Group);

    return tools;
  },
  async addGroup(group: Group) {
    await setDoc(doc(firestore, GROUPS_COLLECTION_NAME, group.id), group);
  },
  async deleteGroup(id: GroupId) {
    await deleteDoc(doc(firestore, GROUPS_COLLECTION_NAME, id));
  },
};
