import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import UerList from '../components/admin/UserList.vue'
import Permission from '../components/Permission.vue'
import Motion from '../components/Motion.vue'
import Goods from '../components/Goods.vue'
import Introduction from '../components/Introduction.vue'
import Food from '../components/Food.vue'
import Calories from '../components/Calories.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children:[
      {path: "/welcome", component: Welcome,},
      {path: "/user", component: UerList,},
      {path: "/rights", component: Permission,},
      {path: "/sport", component: Motion,},
      {path: "/goods", component: Goods,},
      {path: "/introduction", component: Introduction,},
      {path: "/food", component: Food,},
      {path: "/calories", component: Calories,},
    ]
  }

]

const router = new VueRouter({
  routes
})
const originalPath = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPath.call(this, location, onResolve, onReject);
  }
  return originalPath.call(this, location).catch(err => err);
}
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    return next();
  }
  const userFlag = window.sessionStorage.getItem("user");
  if (!userFlag) {
    return next('/login');
  }
  next();
})

export default router
