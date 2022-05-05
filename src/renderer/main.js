import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import App from './App.vue';
import router from './router';
import db from './libs/datastore';
import EventEmitter from 'events';
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime' // import plugin
import 'dayjs/locale/zh-cn' // import locale

dayjs.extend(relativeTime) // use plugin
dayjs.locale('zh-cn') // use locale

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.use(ElementUI);
Vue.prototype.$db = db;
Vue.prototype.$events = new EventEmitter();
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
