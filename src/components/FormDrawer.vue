<template >
	<div>
		<el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="false">
			<div class="formDrawer">
				<div class="body">
					<slot></slot>

				</div>
				<div class="actions">
					<el-button type="primary">提 交</el-button>
					<el-button type="default" @click="close">取 消</el-button>
				</div>
			</div>
		</el-drawer>
	</div>
</template>


<script setup>
import { ref, reactive } from 'vue'
const showDrawer = ref(false)

// 开启
const open = () => {
	showDrawer.value = true
}

// 关闭
const close = () => {
	showDrawer.value = false
}

// 向父组件暴露
defineExpose({
	open,
	close
})

</script>
<style>
.formDrawer {
	width: 100%;
	height: 100%;
	@apply flex flex-col;
}

.formDrawer .body {
	flex: 1;
	overflow-y: auto;
}

.formDrawer .actions {
	height: 50px;
}
</style>