<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import {
		login
	} from '@/api/login.js';

	import {
		useToast
	} from 'wot-design-uni';
	const toast = useToast()
	// 导入 Pinia 的 counter store
	import {
		useCounterStore
	} from '@/stores/counter.js'
	// 获取 counter store 的实例
	const counterStore = useCounterStore()

	// 表单验证对象
	const form = ref()
	// 表单模型，用于绑定输入框数据
	const model = reactive({
		mailbox: '',
		password: ''
	})
	// 定义提交表单的处理函数
	const handleSubmit = () => {
		// 调用表单验证方法
		form.value
			.validate()
			.then(({
				valid,
				errors
			}) => {
				if (valid) {
					// 调用登录API
					login(model)
						.then(res => {
							if (res.code !== 1) {
								toast.warning(res.msg)
							} else {
								// 登录成功，更新 store 中的用户信息
								counterStore.user = res.data
								// 返回上一个页面
								uni.navigateBack();
							}
						})
						.catch(error => {
							// 处理登录失败的情况
							toast.error('服务器异常')
						});
				}
			})
			.catch((error) => {
				console.log(error, 'error')
			})

	}
	
	// 清除密码验证错误的方法
	const resetForm = () => {
		// 清空 model 的值
		model.mailbox = '';
		model.password = '';
		// 重置整个表单，清除所有错误提示
		form.value.reset();
	}
</script>

<template>
	<view class="container">
		<!-- 头部 -->
		<view class="header-content">
			<image class="header-logo" src="../../static/index/head.png"></image>
			<text class="header-text">湖汽万能墙</text>
		</view>
		<!-- 登录表单区域 -->
		<view class="login-form">
			<wd-form ref="form" :model="model" errorType="message">
				<wd-cell-group border>
					<wd-input label="账号 :" label-width="40px" prop="mailbox" clearable v-model.trim="model.mailbox"
						placeholder="请输入电子邮箱" :rules="[{ required: false,pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请填写正确的邮箱格式' }]" />
					<wd-input label="密码 :" label-width="40px" prop="password" show-password clearable
						v-model.trim="model.password" placeholder="请输入登入密码"
						:rules="[{ required: false, pattern: /^\S{6,12}$/, message: '请填写6-12位非空白字符的密码' }]" />
				</wd-cell-group>
				<view class="footer">
					<!-- 轻提示挂载点 -->
					<wd-toast />
					<wd-button type="primary" size="large" @click="handleSubmit" block>立即登入</wd-button>
				</view>
			</wd-form>
		</view>
		<!-- 注册提示区域 -->
		<view class="register-prompt">
			没有账号？点击<navigator url="/pages/register/register" hover-class="none"  @click="resetForm"><text class="register-link">注册</text></navigator>申请账号
		</view>
	</view>
</template>

<style lang="scss">
	.container {
		height: 100vh;
		background-color: rgb(242, 246, 249);

		// 头部
		.header-content {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			padding-top: 100rpx;

			.header-logo {
				width: 200rpx;
				/* 根据需要调整图片大小 */
				height: 200rpx;
				/* 使图片圆形 */
				margin: 10rpx;
			}

			.header-text {
				font-size: 50rpx;
				font-weight: bold;
			}
		}

		// 登录表单区域 
		.login-form {
			padding: 0 50rpx;
			padding-top: 100rpx;

			.footer {
				padding: 0 50rpx;
				padding-top: 150rpx;
			}
		}

		// 注册提示区域
		.register-prompt {
			font-size: 30rpx;
			padding: 25rpx 0;
			text-align: center;
			navigator{
				display: inline;
			}
			.register-link {
				color: rgb(100, 147, 245);
			}
		}
	}
</style>