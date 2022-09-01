import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: 'tools',
    component: () => import('src/modules/tools/pages/Index.vue'),
    children: [
      {
        path: '',
        name: 'tools',
        component: () => import('src/modules/tools/pages/Tools.vue'),
      },
    ],
  },
];
