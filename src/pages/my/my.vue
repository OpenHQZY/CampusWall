<script setup>
	import { ref,onMounted  } from 'vue';
	import Head from './components/Head.vue';
	import Content from './components/Content.vue';
	
</script>

<template>
	<!-- <scroll-view refresher-enabled> -->
	<view class="container">
		<!-- 头部 -->
		<Head></Head>
		<!-- 内容 -->
		<Content></Content>
		<!-- 尾部 -->
		<view class="footer">湖汽校园墙@2024</view>
	</view>
	<!-- </scroll-view> -->
</template>

<style lang="scss">
	.container {
		height: 100vh;
		background-color: rgb(242, 246, 249);
		.footer{
			text-align: center; // 水平居中
			padding-top: 50rpx;
			color: rgb(192, 196, 204);
		}
	}
</style>
