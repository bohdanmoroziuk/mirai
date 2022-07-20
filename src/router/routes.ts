import { RouteRecordRaw } from 'vue-router';

import tasksRoutes from 'src/modules/tasks/routes';
import notesRoutes from 'src/modules/notes/routes';
import weatherRoutes from 'src/modules/weather/routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'product-info',
        name: 'product-info',
        component: () => import('pages/ProductInfo.vue'),
      },
      ...tasksRoutes,
      ...notesRoutes,
      ...weatherRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
