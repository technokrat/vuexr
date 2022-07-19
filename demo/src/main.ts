import {createApp, } from 'vue';

import {VueXR} from '../../src/index';
import App from './components/App';

const app = createApp(App);
app.use(VueXR);
app.mount('#vuexr-demo-app');

export default app;
