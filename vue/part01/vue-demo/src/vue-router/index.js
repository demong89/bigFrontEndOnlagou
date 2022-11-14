let _Vue = null
export default class VueRouter {
  constructor (options) {
    this.options = options
    this.routerMap = {}// key 路由地址 value 路由组件
    this.data = _Vue.observable({
      current: '/'
    })
  }

  static install (Vue) {
    // 1 判断当前插件是否已安装
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true
    // 2 把Vue构造函数记录到全局变量
    _Vue = Vue
    // 3 把创建vue实例时候传入的router对象注入到Vue实例上
    // 混入
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) { // 如果是组件的话 不存在router
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap () {
    // 把构造函数中传过来的routes转换为key-value形式，存放在routerMap中
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })
  }

  initComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      //   template: '<a :href=\'to\'><slot></slot></a>'
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler (e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    const _this = this
    Vue.component('router-view', {
      render (h) {
        const component = _this.routerMap[_this.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
