<script setup>
	import {
		ref
	} from 'vue'
	const tabs = ref(['这', '是', '一', '个', '例子'])
	const tab = ref('例子')
</script>

<template>
	<view class="div-root">
		<wd-tabs v-model="tab">
			<block v-for="item in tabs" :key="item">
				<wd-tab :title="`${item}`" :name="item">
					<view class="content">内容{{ item }}</view>
				</wd-tab>
			</block>
		</wd-tabs>
	</view>
</template>

<style lang="scss">
	.div-root {
		position: relative;
		top: 10vh;

		.content {
			line-height: 100vh;
			text-align: center;
		}
	}
</style>