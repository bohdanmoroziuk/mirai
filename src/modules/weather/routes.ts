import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: 'weather',
    name: 'weather',
    component: () => import('src/modules/weather/pages/Weather.vue'),
  },
];

export default routes;
