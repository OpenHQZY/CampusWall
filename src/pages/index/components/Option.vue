<script setup>
	import {
		ref
	} from 'vue';
	const {
		safeAreaInsets
	} = uni.getSystemInfoSync();
	import {
		useCounterStore
	} from '@/stores/counter'
	const counter = useCounterStore()
	const open_link = (url) => {
	uni.navigateTo({
		url: '/pages/webview/webview?url=' + url
	})
	}
</script>

<template>
	<view class="div-root">
		<view class="div1">
			<view class="div1-1" v-for="(item, index) in counter.index_link_options" :key="item[0]"
				@click="open_link(item[2])">
				<image src="@/static/index/head.png" class="div1-img"></image>
				<text class="div1-txt">{{item[1]}}</text>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	.div1 {
		display: flex;
		flex-direction: row;
		position: relative;
		top: 1vh;
		width: 90vw;
		height: 8vh;
		border-radius: 1vh;
		background-color: white;
		align-items: center;
		justify-content: space-evenly;

		.div1-1 {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.div1-img {
				width: 4.5vh;
				height: 4.5vh;
				border-radius: 2vh;
			}

			.div1-txt {
				font-size: 1.5vh;
			}
		}
	}

	.div-root {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>