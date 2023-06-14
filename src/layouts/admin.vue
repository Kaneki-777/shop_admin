<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<FHeader />
			</el-header>
			<el-container>
				<el-aside width="200px">
					<FMenu />
				</el-aside>
				<el-main>
					<FTagList />
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
import FHeader from '@/layouts/components/FHeader.vue';
import FMenu from '@/layouts/components/FMenu.vue';
import FTagList from '@/layouts/components/FTagList.vue';

</script>