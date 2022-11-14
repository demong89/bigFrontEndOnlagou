let _Vue = null
export default class VueRouter {
  constructor (options) {
    this.options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  static install (Vue) {
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true
    _Vue = Vue
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
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
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })
  }

  initComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandle
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandle (e) {
          location.hash = this.to
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
    window.addEventListener('hashchange', () => {
      this.data.current = location.hash.slice(1)
    })
  }
}
