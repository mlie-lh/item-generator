import {createApp} from 'vue'
import App from './App.vue'
import './assets/index.less'
import eventBus from "./utils/eventBus";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import draggable from 'vuedraggable'
import store from "./store";

const app = createApp(App)
app.config.globalProperties.$eventBus = eventBus
app.use(Antd)
app.use(store)
app.component('draggable', draggable)
app.mount('#app')
