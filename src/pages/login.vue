<template>
	<el-row class="login-container">
		<el-col :lg="16" :md="12" class="left">
			<div>
				<div> 欢迎光临</div>
				<div>此站点是《vue3 + vite实战商城后台开发》视频课程的演示地址</div>
			</div>
		</el-col>
		<el-col :lg="8" :md="12" class="right ">
			<h2 class="title">欢迎回来</h2>
			<div>
				<span class="line"></span>
				<span>账号密码登录</span>
				<span class="line"></span>
			</div>
			<el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
				<el-form-item prop="username">
					<el-input v-model="form.username" placeholder="请输入用户名">
						<template #prefix>
							<el-icon>
								<User />
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
						<template #prefix>
							<el-icon>
								<Lock />
							</el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button round color="#626aef" class="w-[250px] " type="primary" :loading="loading" @click="onSubmit">登 录</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toast } from '@/composables/utils'

// do not use same name with ref

const router = useRouter()
const store = useStore()

const form = reactive({
	username: '',
	password: ''
})
const formRef = ref(null)
const rules = reactive({
	username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const loading = ref(false)
const onSubmit = () => {
	formRef.value.validate((valid) => {
		if (!valid) return;
		loading.value = true

		store.dispatch("login", form).then(res => {
			toast('登陆成功')
			router.push("/")
		}).finally(() => {
			loading.value = false
		})

	})
}

// 添加键盘回车事件
function onKeyup(e) {
	if (e.key == 'Enter') onSubmit()
}

// 添加键盘监听事件
onMounted(() => {
	document.addEventListener('keyup', onKeyup)
})
onBeforeUnmount(() => {
	document.removeEventListener('keyup', onKeyup)
})

</script>

<style scoped  lang="postcss">
.login-container {
	@apply min-h-screen bg-indigo-500;
}

.login-container .left,
.login-container .right {
	@apply flex items-center justify-center;
}

.login-container .right {
	@apply bg-light-50 flex-col;
}

.left>div>div:first-child {
	@apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
	@apply text-gray-200 text-sm;
}

.right .title {
	@apply font-bold text-3xl text-gray-800;
}

.right>div {
	@apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
	@apply h-[1px] w-16 bg-gray-200;
}
</style>
