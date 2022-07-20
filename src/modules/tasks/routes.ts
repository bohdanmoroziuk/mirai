import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: 'tasks',
    component: () => import('src/modules/tasks/pages/TasksIndex.vue'),
    children: [
      {
        path: '',
        name: 'tasks',
        redirect: {
          name: 'today',
        },
      },
      {
        path: 'inbox',
        name: 'inbox',
        component: () => import('src/modules/tasks/pages/InboxTasks.vue'),
      },
      {
        path: 'today',
        name: 'today',
        component: () => import('src/modules/tasks/pages/TodayTasks.vue'),
      },
      {
        path: 'overdue',
        name: 'overdue',
        component: () => import('src/modules/tasks/pages/OverdueTasks.vue'),
      },
    ],
  },
];

export default routes;
