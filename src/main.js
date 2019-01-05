import Vue from 'vue'
import App from './App.vue'
import Router from './router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


new Vue({
  router:Router,
  el: '#app',
  render: h => h(App)
})
