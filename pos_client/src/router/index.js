import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      permission: 'M000B00',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/pos',
    component: Layout,
    redirect: '/pos',
    children: [{
      path: 'index',
      permission: 'All',
      name: 'POS',
      component: () => import('@/views/pos/index'),
      meta: { title: 'POS', icon: 'supermarket' }
    }]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product',
    children: [{
      path: 'index',
      permission: 'M010B00',
      name: 'Product',
      component: () => import('@/views/product/index'),
      meta: { title: 'Product', icon: 'list' }
    }]
  },
  {
    path: '/purchase',
    component: Layout,
    redirect: '/purchase',
    children: [{
      path: 'index',
      permission: 'All',
      name: 'Purchase',
      component: () => import('@/views/purchase/index'),
      meta: { title: 'Purchase', icon: 'purchase' }
    }]
  },
  {
    path: '/dailyreport',
    component: Layout,
    redirect: '/dailyreport',
    children: [{
      path: 'index',
      permission: 'All',
      name: 'Dailyreport',
      component: () => import('@/views/dailyreport/index'),
      meta: { title: 'Dailyreport', icon: 'chart' }
    }]
  },
  {
    path: '/unit',
    component: Layout,
    redirect: '/unit',
    children: [{
      path: 'index',
      permission: 'M011B00',
      name: 'Units',
      component: () => import('@/views/unit/index'),
      meta: { title: 'Units', icon: 'cup-measuring' }

    }]
  },
  {
    path: '/mainCategory',
    component: Layout,
    redirect: '/mainCategory',
    children: [{
      path: 'index',
      permission: 'M008B00',
      name: 'Category',
      component: () => import('@/views/mainCategory/index'),
      meta: { title: 'Main Category', icon: 'tree' }
    }]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    children: [{
      path: 'index',
      permission: 'M008B00',
      name: 'Order',
      component: () => import('@/views/order/index'),
      meta: { title: 'Order', icon: 'tree' }
    }]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category',
    children: [{
      path: 'index',
      permission: 'M008B00',
      name: 'Category',
      component: () => import('@/views/category/index'),
      meta: { title: 'Category', icon: 'tree' }
    }]
  },

  {
    path: '/brand',
    component: Layout,
    redirect: '/brand',
    children: [{
      path: 'index',
      permission: 'M009B00',
      name: 'Brand',
      component: () => import('@/views/brand/index'),
      meta: { title: 'Brand', icon: 'list' }
    }]
  },

  {
    path: '/customers',
    component: Layout,
    redirect: '/customers',
    children: [{
      path: 'index',
      permission: 'M004B00',
      name: 'Customers',
      component: () => import('@/views/customers/index'),
      meta: { title: 'Customers', icon: 'user' }
    }]
  },

  {
    path: '/suppliers',
    component: Layout,
    redirect: '/suppliers',
    children: [{
      path: 'index',
      permission: 'M005B00',
      name: 'Suppliers',
      component: () => import('@/views/suppliers/index'),
      meta: { title: 'Suppliers', icon: 'user' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      path: 'index',
      permission: 'M003B00',
      name: 'User',
      component: () => import('@/views/user/index'),
      meta: { title: 'User', icon: 'user' }
    }]
  },
  {
    path: '/warehouse',
    component: Layout,
    redirect: '/warehouse',
    children: [{
      path: 'index',
      permission: 'M007B00',
      name: 'Warehouse',
      component: () => import('@/views/warehouse/index'),
      meta: { title: 'Warehouse', icon: 'factory' }
    }]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission',
    children: [{
      path: 'index',
      permission: 'M002B00',
      name: 'Permission Group',
      component: () => import('@/views/permission/index'),
      meta: { title: 'Permission Group', icon: 'shield' }
    }]
  },
  {
    path: '/branch',
    component: Layout,
    redirect: '/branch',
    children: [{
      path: 'index',
      permission: 'M006B00',
      name: 'Branch',
      component: () => import('@/views/branch/index'),
      meta: { title: 'Branch', icon: 'tree' }
    }]
  },

  {
    path: '/company',
    component: Layout,
    redirect: '/company',
    children: [{
      path: 'index',
      permission: 'M001B00',
      name: 'Company',
      component: () => import('@/views/company/index'),
      meta: { title: 'Company', icon: 'star' }
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// for (const i of store.getters.curUserInfo.user.groups) {
//   console.log(i)
// }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
window.onpopstate = function() {
  console.log('back')
}
const router = createRouter()
router.beforeEach((to, from, next) => {
  // const IsItABackButton = window.popStateDetected
  if (localStorage.getItem('back') === 'true') {
    next(false)
    localStorage.setItem('back', false)
    return ''
  }
  // if (IsItABackButton) {
  //   next(false)
  //   return ''
  // }
  next()
})
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
