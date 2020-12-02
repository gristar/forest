import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import Root from './App.vue'

const app = createApp(Root)

import { Button, Breadcrumb, InputNumber, Card, Space, Input, Tooltip } from 'ant-design-vue';
app.use(Button);
app.use(Breadcrumb);
app.use(InputNumber);
app.use(Card);
app.use(Space)
app.use(Input)
app.use(Tooltip)

app.mount('#app')