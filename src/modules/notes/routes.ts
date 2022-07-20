import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: 'notes',
    name: 'notes',
    component: () => import('src/modules/notes/pages/Notes.vue'),
  },
];

export default routes;
