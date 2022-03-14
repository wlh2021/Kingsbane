import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
/* 导入阿里图标css文件 */


import $ from 'jquery'
window.jQuery = $
window.$ = $

import "@/assets/fonts/iconfont.css";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

/* markdown */
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
/* 渲染 markdown */
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

// highlightjs
import hljs from 'highlight.js';

//代码行号
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';



//高亮代码行
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';



// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

/* 代码快捷复制 */
/* import VueMarkdownEditor from '@kangc/v-md-editor';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

VueMarkdownEditor.use(createCopyCodePlugin()); */





VMdPreview.use(githubTheme, {
  Hljs: hljs,
  config: {
      toc: {
        includeLevel: [2, 4],
      },
    },
});

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdEditor.use(createLineNumbertPlugin());
VMdEditor.use(createHighlightLinesPlugin());
VMdEditor.Codemirror = Codemirror;




router.beforeEach((to,from,next) => {
  if(to.meta.is){
    document.title = to.meta.title + " - Kingsbane弑君" 
  }else if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})




const app = createApp(App)

//app.prototype.$http = axios


app.use(store).use(router).use(ElementPlus,{locale: zhCn,size:'small'}).use(VMdEditor).use(VMdPreview).use(Antd).mount('#app')
