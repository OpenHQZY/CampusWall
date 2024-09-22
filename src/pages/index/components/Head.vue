<script setup>
	import {
		ref
	} from 'vue';

	const {
		safeAreaInsets
	} = uni.getSystemInfoSync();
</script>

<template>
	<view :style="{ paddingTop: safeAreaInsets.top+0 + 'px' }" class="div-root">
		<view class="div1">
			<image src="@/static/index/head.png" class="div1-img"></image>
			<text class="div1-txt">湖汽万能墙</text>
		</view>
		<view class="div2">
			<view class="div2-ico"><wd-icon name="search" color="#a0a0a0" size="2vh" /></view>
			<text class="div2-txt">搜索帖子</text>
		</view>
	</view>
</template>

<style lang="scss">
	
	.div2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		left: 2vh;
		height: 3vh;
		width: 30vw;
		border-radius: 5vh;
		background-color: rgb(238, 238, 238);
		.div2-ico{
			display: flex;
			align-items: center;
			position: relative;
			left: 2vh;
		}
		.div2-txt{
			position: relative;
			left: 2.5vh;
			font-size: 1.6vh;
			color: rgb(176, 176, 176);
		}
	}
	.div1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		left: 0.3vh;
		.div1-img {
			width: 4.5vh;
			height: 4.5vh;
			border-radius: 50%;
		}
		.div1-txt{
			position: relative;
			left: 0.3vh;
			font-size: 2.5vh;
			font-weight: bold;
		}
	}

	.div-root {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>