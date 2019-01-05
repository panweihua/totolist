import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import App from '../App';

Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        component:Index
    }
]

let router =  new VueRouter({
    routes:routes
})
export default router;
