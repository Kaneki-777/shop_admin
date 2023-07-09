import { router, addRoutes } from '@/router'
import { getToken } from '@/composables/auth'
import { toast, showFullLoading, hideFullLoading } from '@/composables/utils'
import store from './store'

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
	// 显示全局的loading
	showFullLoading()

	const token = getToken()

	// 没有登陆，强制调回登录页
	if (!token && to.path != '/login') {
		toast('请先登录', 'error')
		return next({ path: '/login' })
	}
	//  避免重复登录
	if (token && to.path == '/login') {
		toast('请勿重复登录', 'error')
		return next({ path: from.path ? from.path : '/' })
	}
	// 如果用户登陆了，自动获取用户信息，并存储到vuex中
	let hasNewRoutes = false
	if (token) {
		let { menus } = await store.dispatch("getInfo")
		// 动态添加路由
		hasNewRoutes = addRoutes(menus)
	}
	// 设置页面标题
	let title = (to.meta.title ? to.meta.title : '') + '-管理系统'
	document.title = title
	hasNewRoutes ? next(to.fullPath) : next()
})

// 全局后置钩子
router.afterEach((to, from) => {
	hideFullLoading()
})