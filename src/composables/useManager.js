import { ref, reactive } from 'vue'
import { logout, updatepassword } from '@/api/manager'
import { showModal, toast } from '@/composables/utils'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'



export function useRepassword() {
	const router = useRouter()
	const store = useStore()

	// 修改密码
	const formDrawerRef = ref(null)
	const form = reactive({
		oldpassword: '',
		password: '',
		repassword: ''
	})
	const rules = reactive({
		oldpassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
		password: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
		repassword: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }]
	})

	const formRef = ref(null)
	const onSubmit = () => {
		formRef.value.validate((valid) => {
			if (!valid) return;
			formDrawerRef.value.showLoading()
			updatepassword(form).then(res => {
				toast('修改密码成功，请重新登录')
				store.dispatch("loginOut")
				router.push('/login')
			}).finally(() => {
				formDrawerRef.value.hideLoading()
			})
		})
	}
	const openRepasswordForm = () => formDrawerRef.value.open()
	return {
		formDrawerRef,
		form,
		rules,
		formRef,
		onSubmit,
		openRepasswordForm
	}
}

export function useLoginOut() {
	const router = useRouter()
	const store = useStore()
	function loginOut() {
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
	return {
		loginOut
	}
}