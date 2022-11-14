import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _48056db1 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _55945d26 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _5d2f9002 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _ae9b2ffc = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _3182eca9 = () => interopDefault(import('..\\pages\\setting' /* webpackChunkName: "" */))
const _3c3693f4 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _e106a962 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _48056db1,
    children: [{
      path: "",
      component: _55945d26,
      name: "home"
    }, {
      path: "/login",
      component: _5d2f9002,
      name: "login"
    }, {
      path: "/register",
      component: _5d2f9002,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _ae9b2ffc,
      name: "profile"
    }, {
      path: "/setting",
      component: _3182eca9,
      name: "setting"
    }, {
      path: "/editor",
      component: _3c3693f4,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _e106a962,
      name: "articleDetail"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
