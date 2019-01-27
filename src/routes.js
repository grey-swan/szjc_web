import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
// import Table from './views/nav1/Table.vue'
// import Form from './views/nav1/Form.vue'
// import user from './views/nav1/user.vue'
// import Page4 from './views/nav2/Page4.vue'
import GbPerform from './views/nav3/GbPerform.vue'
import Sample from './views/nav3/Sample.vue'
import SampleAdd from './views/nav3/SampleAdd.vue'
import Sheet from './views/nav3/Sheet.vue'
import Report from './views/Report.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    // {
    //     path: '/report/view/',
    //     component: Report,
    //     name: '',
    //     hidden: true
    // },
    {
        path: '/',
        redirect: '/sample/'
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/main',
        component: Main
    },
    // {
    //     path: '',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '收样',
        children: [
            { path: '/perform/', component: GbPerform, name: '执行标准'},
            { path: '/sample/', component: Sample, name: '抽样记录'},
            { path: '/sample/add/', component: SampleAdd, name: '添加抽样'},
            { path: '/sheet/', component: Sheet, name: '流转单'},
            { path: '/report/view/', component: Report, name: '报告'},
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;