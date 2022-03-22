import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./Layout.vue";
import router from "./router";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus)
app.mount("#app");
