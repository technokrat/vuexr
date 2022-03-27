import {createApp, } from 'vue';

import {VueXR} from '../../src/vuexr';
import App from '../components/App.vue';

const app = createApp(App);
app.use(VueXR);
app.mount('#vuexr-demo-app');

export default app;
