import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
} from 'firebase/firestore';

import { firestore } from 'src/firebase';

import { Tool, ToolId } from 'src/modules/tools';

export const TOOLS_COLLECTION_NAME = 'tools';

export const toolsService = {
  async getTools() {
    const snapshot = await getDocs(collection(firestore, TOOLS_COLLECTION_NAME));

    const tools = snapshot.docs.map((doc) => doc.data() as Tool);

    return tools;
  },
  async addTool(tool: Tool) {
    await setDoc(doc(firestore, TOOLS_COLLECTION_NAME, tool.id), tool);
  },
  async deleteTool(id: ToolId) {
    await deleteDoc(doc(firestore, TOOLS_COLLECTION_NAME, id));
  },
};
