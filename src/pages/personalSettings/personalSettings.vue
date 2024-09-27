<script setup>
</script>

<template>
	<view class="container">
		<view class="profile-picture">
			<!-- 头像 -->
			<view class="profile-header">
				<text>头像</text>
				<view class="profile-content">
					<image src="../../static/my/profilePicture.jpg" class="avatar" />
					<wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
				</view>
			</view>
			<!-- 昵称 -->
			<view class="name">
				<text>昵称</text>
				<view class="profile-content">
					<text>莫同学safsaf</text>
					<wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
				</view>
			</view>
		</view>
		<!-- 保存按钮 -->
		<view class="button-container">
			<wd-button type="success" disabled>保存</wd-button>
		</view>
	</view>

</template>

<style lang="scss">
	.container {
		height: 100vh;
		background-color: rgb(242, 246, 249);
		padding-top: 15rpx;

		.profile-picture {
			padding: 0 30rpx;
			background-color: rgb(255, 255, 255);

			// 头像
			.profile-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-weight: bold;
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);

				.profile-content {
					display: flex;
					align-items: center;

					.avatar {
						width: 100rpx;
						/* 根据需要调整图片大小 */
						height: 100rpx;
						/* 根据需要调整图片大小 */
						border-radius: 50%;
						/* 使图片圆形 */
						margin: 10rpx;
					}
				}
			}
			// 昵称
			.name {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-weight: bold;
				padding: 50rpx 0;

				.profile-content {
					display: flex;
					align-items: center;

					text {
						font-weight: normal;
					}
				}
			}
		}
		
		// 保存按钮
		.button-container{
			display: flex;
			justify-content: center;
			padding-top: 100rpx;
		}
	}
</style>