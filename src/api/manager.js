import instance from '@/axios'

export function login(username, password) {
	return instance.post("/admin/login", {
		username,
		password
	})
}

export function getInfo() {
	return instance.post("/admin/getinfo")
}

// 退出登录
export function logout() {
	return instance.post("/admin/logout")
}
