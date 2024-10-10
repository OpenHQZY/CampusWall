<script setup>
	import {
		reactive,
		onMounted,
		ref
	} from 'vue';
	import {
		useToast
	} from 'wot-design-uni';
	const toast = useToast()
	import {
		useCounterStore
	} from '@/stores/counter.js'
	// 获取 counter store 的实例
	const counterStore = useCounterStore()
	import {
		OSSUpload,
		updateUserInformationAPI
	} from '@/api/personalSettings.js';

	// 在组件挂载后执行的钩子
	onMounted(() => {
		user.userName = counterStore.user.userName
		user.userProfilePicture = counterStore.user.userProfilePicture
	})
	// 创建一个响应式对象 user，包含用户名和头像路径
	const user = reactive({
		userName: '',
		userProfilePicture: ''
	})

	// 使用 ref 创建一个响应式变量，用于控制保存按钮的启用状态
	const isSaveEnabled = ref(true)

	// 定义更新头像的函数
	const updateImg = () => {
		uni.chooseImage({
			count: 1,
			success(res) {
				OSSUpload(res.tempFilePaths[0]).then(res => {
					// 上传成功，更新用户头像
					user.userProfilePicture = res.data
					isSaveEnabled.value = false
				}).catch(error => {
					toast.error('服务器异常')
					console.error('上传失败:', error); // 处理上传错误
				});
			}
		})
	}
	// 处理用户名输入的变化
	const handleChange = (event) => {
		user.userName = event.value
		isSaveEnabled.value = false
	}

	const updateUserInformation = () => {
		updateUserInformationAPI(user).then(res => {
			isSaveEnabled.value = true
			counterStore.user.userName = user.userName
			counterStore.user.userProfilePicture = user.userProfilePicture
			toast.success('保存成功')
		}).catch(error => {
			toast.error('服务器异常')
		});
	}
</script>

<template>
	<view class="container">
		<view class="profile-picture">
			<!-- 头像 -->
			<view class="profile-header">
				<text>头像</text>
				<view class="profile-content">
					<image :src="user.userProfilePicture" class="avatar" @click="updateImg" />
					<wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
				</view>
			</view>
			<!-- 昵称 -->
			<view class="name">
				<text>昵称</text>
				<view class="profile-content">
					<wd-input type="text" :placeholder="user.userName" @input="handleChange"
						custom-input-class="right-aligned" no-border />
					<wd-icon name="arrow-right" color="rgb(185, 185, 185)" size="18px"></wd-icon>
				</view>
			</view>
		</view>
		<!-- 保存按钮 -->
		<view class="button-container">
			<!-- 轻提示挂载点 -->
			<wd-toast />
			<wd-button type="success" :disabled="isSaveEnabled" @click="updateUserInformation">保存</wd-button>
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
				}

				.right-aligned {
					text-align: right;
					/* 这可能不会影响占位符，但可以控制文本输入 */
					color: rgb(128, 128, 128);
				}
			}
		}

		// 保存按钮
		.button-container {
			display: flex;
			justify-content: center;
			padding-top: 100rpx;
		}
	}
</style>