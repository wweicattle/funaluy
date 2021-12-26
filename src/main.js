import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

import 'element-plus/dist/index.css'
import "@/assets/css/base.css"
import  "@/assets/css/common.scss"
import * as echarts from 'echarts/core';


import { createPinia } from 'pinia'

import {
    BarChart,
    LineChart,
    PieChart
} from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LegendScrollComponent,
    LegendPlainComponent,
    MarkPointComponent,
    AxisPointerComponent
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, LineChart, PieChart, LegendComponent, LegendScrollComponent, LegendPlainComponent, LegendScrollComponent, MarkPointComponent, AxisPointerComponent, LineChart]
);

const app = createApp(App)

app.config.globalProperties.foo = 'bar';
app.config.globalProperties.echarts = echarts
installElementPlus(app)
app.use(store).use(createPinia()).use(router).mount('#app');