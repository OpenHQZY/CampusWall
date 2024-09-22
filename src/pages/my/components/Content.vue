<script setup>
	import { ref } from 'vue';
	
	 // 分享与联系模块
	 const shareContactModule = ref(['社区规范&小黑屋','分享好友','联系开发者']);
	 // 问题意见反馈与重新登入模块
	 const feedbackAndLoginModule = ref(['问题与意见反馈', '重新登入']);
</script>

<template>
	<!-- 校园认证模块 -->
	<navigator url="/pages/authentication/authentication" hover-class="none">
		<view class="features-container">
			<view class="feature-item">
				<image src="@/static/my/authentication.png"></image>
				<text>校园认证</text>
			</view>
			<view class="unverified">
				<text>未认证</text>
				<wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
			</view>
		</view>
	</navigator>
	<!-- 分享与联系模块 -->
	<view class="share-contact-container">
		<view class="feature-item-container" v-for="(item, index) in shareContactModule" :key="index">
			<view class="feature-item">
				<image src="@/static/my/authentication.png"></image>
				<text>{{item}}</text>
			</view>
			<view class="unverified">
				<wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
			</view>
		</view>
	</view>

	<view class="share-contact-container">
		<view class="feature-item-container" v-for="(item, index) in feedbackAndLoginModule" :key="index">
			<view class="feature-item">
				<image src="@/static/my/authentication.png"></image>
				<text>{{item}}</text>
			</view>
			<view class="unverified">
				<wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	// 校园认证模块
	.features-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: rgb(255, 255, 255);
		margin: 0 30rpx;
		margin-top: 30rpx;
		.feature-item {
			display: flex;
			align-items: center;
			color: rgb(75, 72, 89);
			padding: 30rpx;
			image {
				width: 37rpx;
				/* 根据需要调整图片大小 */
				height: 37rpx;
				/* 根据需要调整图片大小 */
			}
			text {
				padding-left: 15rpx;
			}
		}
		.unverified {
			display: flex;
			align-items: center;
			padding-right: 18rpx;
			text {
				color: rgb(185, 185, 185);
			}
		}
	}
	// 多个模块
	.share-contact-container {
		background-color: rgb(255, 255, 255);
		margin: 0 30rpx;
		margin-top: 30rpx;
		padding: 0 20rpx;
		.feature-item-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.feature-item {
				display: flex;
				align-items: center;
				color: rgb(75, 72, 89);
				padding: 30rpx;
				padding-left: 10rpx;

				image {
					width: 37rpx;
					/* 根据需要调整图片大小 */
					height: 37rpx;
					/* 根据需要调整图片大小 */
				}

				text {
					padding-left: 15rpx;
				}
			}
			.unverified {
				display: flex;
				align-items: center;
			}
		}
	}
	//多个模块设置边框分割
	.feature-item-container:not(:last-child) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
</style>