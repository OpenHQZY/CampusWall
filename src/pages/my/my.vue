<script setup>
	import { ref } from 'vue';
	import Head from './components/Head.vue';
	import Content from './components/Content.vue';
</script>

<template>
	<view class="container" >
		<!-- 头部 -->
		<Head></Head>
		<!-- 内容 -->
		<Content></Content>
		
	</view>
</template>

<style lang="scss">
	.container {
		height: 100vh;
		background-color: rgb(242, 246, 249);
	}
</style>
