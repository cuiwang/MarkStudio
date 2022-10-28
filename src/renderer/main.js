import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import App from './App.vue';
import router from './router';
import store from './store'
import EventEmitter from 'events';
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime' // import plugin
import 'dayjs/locale/zh-cn' // import locale
import mixin from './libs/mixin'


dayjs.extend(relativeTime) // use plugin
dayjs.locale('zh-cn') // use locale

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.use(ElementUI);

Vue.prototype.$events = new EventEmitter();
Vue.config.productionTip = false;
Vue.mixin({
  mixins: [mixin],
})

/*
  按钮防抖动指令
*/
/*Vue.directive('debounce', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3 * 1000)
      }
    })
  }
})*/


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');