import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

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
    component: Home
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
