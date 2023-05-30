<template >
	<div>
		<h1>后台首页</h1>
		{{ $store.state.user.username }}

		<el-button @click="loginOut">退出登录</el-button>
	</div>
</template>


<script setup>
import { logout } from '@/api/manager'
import { showModal, toast } from '@/composables/utils'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const loginOut = () => {
	showModal('是否退出登录?').then(res => {
		logout().finally(() => {
			store.dispatch("loginOut")
			// 跳转回登录页
			router.push('/login')
			// 提示退出登录成功
			toast("退出登录成功")
		})
	})
}

</script>
<style scoped></style>