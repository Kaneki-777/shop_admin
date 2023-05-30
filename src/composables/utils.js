import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress';
// 成功提示
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
	ElNotification({
		message,
		type,
		dangerouslyUseHTMLString,
		duration: 3000,
	})
}

// 退出提示
export function showModal(content = '提示内容', type = "warning", title = '') {
	return ElMessageBox.confirm(
		content,
		title,
		{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type,
		}
	)
}

// 全局显示loading
export function showFullLoading() {
	nprogress.start();
}
// 全局隐藏loading
export function hideFullLoading() {
	nprogress.done();
}

