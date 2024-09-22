<script setup>
	import { ref } from 'vue';
	
	const { safeAreaInsets } = uni.getSystemInfoSync();
	// 用于放置帖子、点赞等
	const actionItems = ref(['帖子', '点赞', '评论', '收藏'])
</script>

<template>
	<!-- 头部 -->
	<view class="profile" :style="{ paddingTop: safeAreaInsets.top+40 + 'px' }">
		<!-- 左边部分 -->
		<view class="info">
			<!-- 头像 -->
			<image class="avatar" src="@/static/my/profilePicture.jpg"></image>
			<view class="name-user-container" @tap="">
				<view class="name">用户名</view>
				<text class="user-id">用户ID:20225222123</text>
			</view>
		</view>
		<!-- 右边部分 -->
		<view class="edit-btn-container">
			<view class="edit-btn">编辑资料</view>
			<wd-icon name="arrow-right" color="rgb(148, 148, 148)" size="18px"></wd-icon>
		</view>
	</view>
	<!-- 新增的容器，用于放置帖子、点赞等 -->
	<view class="action-container">
		<view class="action-item" v-for="(item, index) in actionItems" :key="index">
			{{item}}
			<view style="font-size: 1.2rem; padding-top: 10rpx; color: rgb(82, 141, 245); font-weight: bold;">2</view>
		</view>
	</view>
</template>

<style lang="scss">
	// 头部
	.profile {
		display: flex;
		background-color: rgb(255, 255, 255);
		justify-content: space-between;
		align-items: flex-start;
		// 左边部分
		.info {
			display: flex;
			// 头像
			.avatar {
				width: 110rpx;
				/* 根据需要调整图片大小 */
				height: 110rpx;
				/* 根据需要调整图片大小 */
				border-radius: 50%;
				/* 使图片圆形 */
				margin: 10rpx;
			}
			// 姓名与id
			.name-user-container {
				padding-left: 20rpx;
				.name {
					font-size: 40rpx;
					font-weight: bold;
					padding: 10rpx 0;
				}
				.user-id {
					color: rgb(112, 112, 112);
					font-size: 25rpx;
					padding: 5rpx 10rpx;
					border: 1px solid rgba(0, 0, 0, 0.2);
					/* 添加边框 */
					border-radius: 9px;
					/* 添加圆角 */
				}
			}
		}
		// 右边部分
		.edit-btn-container {
			display: flex;
			align-items: center;
			padding-right: 10rpx;
			.edit-btn {
				color: rgb(148, 148, 148);
				padding: 20rpx;
				padding-right: 0;
			}
		}
	}
	// 新增的容器，用于放置帖子、点赞等
	.action-container{
		display: flex;
		background-color: rgb(255, 255, 255);
		justify-content: space-evenly;
		.action-item{
			color: rgb(68, 78, 89);
			width: 100rpx;
			height: 100rpx;
			background-color: rgb(242, 252, 254);
			margin: 25rpx;
			padding: 20rpx;
			font-size: 0.8rem;
		}
	}
</style>