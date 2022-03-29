import Vue from 'vue';
import VueRouter from 'vue-router';
import Error from '../components/Error.vue';
import MarkSetting from '../views/MarkSetting';
import Dashboard from '../views/Dashboard';
import Home from '../views/Home';
import Help from '../views/Help';
import Project from '../views/Project';
import GlobalSetting from '../views/GlobalSetting';
import RelationSetting from '../views/RelationSetting';
import DialogueSetting from '../views/DialogueSetting';

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: { name: 'dashboard' },
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: Dashboard,
      },
      {
        name: 'marksetting',
        path: 'marksetting',
        component: MarkSetting,
      },
      {
        name: 'globalsetting',
        path: 'globalsetting',
        component: GlobalSetting,
      },
      {
        name: 'relationsetting',
        path: 'relationsetting',
        component: RelationSetting,
      },
      {
        name: 'dialoguesetting',
        path: 'dialoguesetting',
        component: DialogueSetting,
      },
      {
        name: 'project',
        path: 'project',
        component: Project,
      },
      {
        name: 'help',
        path: 'help',
        component: Help,
      },
    ],
  },
  {
    path: '*',
    name: 'error',
    component: Error,
  },
];

const router = new VueRouter({
  //mode: 'hash',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
