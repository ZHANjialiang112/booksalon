import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'; // 2.1引入结构
import 'element-ui/lib/theme-chalk/index.css'; // 2.2引入样式
import axios from 'axios';
import router from "./router/index";
import cookie from 'cookie'

Vue.prototype.$cookie = cookie;
Vue.prototype.$ajax = axios
Vue.prototype.router = router
Vue.config.productionTip = false

Vue.use(ElementUI); // 3.安装
//倒挂，定义全局请求路径
Vue.prototype._CONTEXTURL = 'http://localhost:12138';
Vue.prototype._Authorization = 'fYqYDLv7i5y4NvdhxyaxpN7Kk6YLF140';
Vue.prototype._ImgConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": "fYqYDLv7i5y4NvdhxyaxpN7Kk6YLF140"
  }
}
//路由导包


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
