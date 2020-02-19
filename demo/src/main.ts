import Vue from 'vue';

import {VueXR} from '../../src/vuexr';
import App from '../components/App.vue';

Vue.use(VueXR);

const app = new Vue({
  el: '#vuexr-demo-app',
  render: h => h(App),
});

export default app;
