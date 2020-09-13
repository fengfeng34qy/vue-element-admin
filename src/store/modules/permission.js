import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route, i) {
//   console.log(route)
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  console.log('角色', roles)
  // if (routes.meta && routes.meta.roles) {
  //   res.push(tmp)
  // }
  for (let i = 0; i < routes.length; i++) {
    if (!routes[i].meta || !routes[i].meta.roles || routes[i].meta.roles.includes(roles[0])) {
      console.log('%c' + i, 'color:green')
      res.push(routes[i])
    }
  }
  // routes.forEach((route, index) => {
  //   const tmp = { ...route }
  //   if (hasPermission(roles, tmp, index)) {
  //     if (tmp.children) {
  //       tmp.children = filterAsyncRouter(tmp.children, roles)
  //     }
  //     res.push(tmp)
  //   }
  // })
  return res
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        console.log('路由', asyncRouterMap)
        if (roles.includes('admin')) {
          console.log('%c您是超级用户', 'color:green')
          accessedRouters = asyncRouterMap
        } else {
          console.log('%c您是普通用户，过滤路由', 'color:green')
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          console.log('最终过滤出来的路由')
          console.log(accessedRouters)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
