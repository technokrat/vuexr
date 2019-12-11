import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';

import VueXR from '../src/vuexr';

import App from './App';

///////////////////////
//  Use Vue plugins  //
///////////////////////
Vue.use(VueXR);
Vue.use(VueRouter);


const app = new Vue({

}).$mount('#vuexr-demo-app');

export default app;
