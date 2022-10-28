import Vue          from 'vue'
import VueRouter    from 'vue-router'
import Error        from '../components/Error.vue'
import Dashboard    from '../views/Dashboard'
import Home               from '../views/Home'
import Help               from '../views/Help'
import Project            from '../views/Project'
import Login              from '../views/Login'
import Setting            from '../views/Setting'
import Notification       from '../components/Notification'
import Keyboard           from '../views/Keyboard'
import Label              from '../views/Label'
import User               from '../views/User'
import LabelSetting       from '../components/LabelSetting'
import Feedback           from '../views/Feedback'
import NotificationCenter from '../views/NotificationCenter'
import MemberCenter       from '../views/MemberCenter'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location)
                     .catch((err) => err)
}
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: {name: process.env.IS_WEB?'login':'project'},
    children: [
      {
        name: 'login',
        path: 'login',
        component: Login
      },
      {
        name: 'setting',
        path: 'setting',
        component: Setting
      },
      {
        name: 'keyboard',
        path: 'keyboard',
        component: Keyboard
      },
      {
        name: 'label',
        path: 'label',
        component: Label
      },
      {
        name: 'user',
        path: 'user',
        component: User
      },
      {
        name: 'dashboard',
        path: 'dashboard',
        component: Dashboard
      },
      {
        name: 'labelsetting',
        path: 'labelsetting',
        component: LabelSetting
      },
      {
        name: 'project',
        path: 'project',
        component: Project
      },
      {
        name: 'help',
        path: 'help',
        component: Help
      },
      {
        name: 'feedback',
        path: 'feedback',
        component: Feedback
      },
      {
        name: 'nc',
        path: 'nc',
        component: NotificationCenter
      },
      {
        name: 'mc',
        path: 'mc',
        component: MemberCenter
      }
    ]
  },
  {
    path: '*',
    name: 'error',
    component: Error
  }
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
export default router