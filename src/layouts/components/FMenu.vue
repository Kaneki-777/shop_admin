<template>
	<div class="f-menu" :style="{ width: $store.state.asideWidth }">
		<el-menu
						 :collapse="isCollapse"
						 :collapse-transition="false"
						 :default-active="defaultActive"
						 class="border-0"
						 @select="handleSelect"
						 :unique-opened="true">
			<template v-for="(item, index1) in asideMenus" :key="index1">
				<el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
					<template #title>
						<el-icon>
							<component :is="item.icon"></component>
						</el-icon>
						<span>{{ item.name }}</span>
					</template>
					<el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
						<el-icon>
							<component :is="item2.icon"></component>
						</el-icon>
						<span>{{ item2.name }}</span>
					</el-menu-item>
				</el-sub-menu>

				<el-menu-item v-else :index="item.frontpath">
					<el-icon>
						<component :is="item.icon"></component>
					</el-icon>
					<span>{{ item.name }}</span>
				</el-menu-item>

			</template>
		</el-menu>


	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const route = useRoute()
const store = useStore()

// 默认选中
const defaultActive = ref(route.path)

// 是否折叠
const isCollapse = computed(() => !(store.state.asideWidth == '250px'))

const asideMenus = computed(() => store.state.menus)

const handleSelect = (e) => {
	router.push(e)
}

</script>

<style>
.f-menu {
	top: 64px;
	bottom: 0;
	left: 0;
	overflow-y: auto;
	overflow-x: hidden;
	@apply shadow-md fixed bg-light-50;
	transition: all .2s;
}

.f-menu::-webkit-scrollbar {
	width: 0;
}
</style>