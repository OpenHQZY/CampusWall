<script setup>
	import { ref } from 'vue';
	import Head from './components/Head.vue';
	import Option from './components/Option.vue';
	import Content from './components/Content.vue';
</script>

<template>
	<view class="container">
		<Head class="header"></Head>
		<Option></Option>
		<Content></Content>
	</view>
</template>

<style lang="scss">
	.container {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		background-color: rgb(243, 243, 243);
	}
	.header {
	  position: sticky;
	  top: 0;
	  z-index: 10;
	  background-color: white;
	}
</style>
