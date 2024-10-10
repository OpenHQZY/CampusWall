<script setup>
	import {
		reactive,
		ref
	} from 'vue'

	import {
		useToast
	} from 'wot-design-uni';
	const toast = useToast()

	import {
		getCode,
		register
	} from '@/api/register.js';

	// 用于控制倒计时
	const countdown = ref(60);
	const isCounting = ref(false);
	// 添加加载状态
	const isLoading = ref(false);

	// 获取验证码的处理函数
	const getCaptcha = () => {
		if (isCounting.value) return; // 如果正在倒计时，不执行
		if (model.mailbox === '') {
			toast.warning("请填写邮箱")
			return;
		}
		// 校验邮箱格式
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailPattern.test(model.mailbox)) {
			toast.warning("邮箱格式不正确");
			return;
		}
		isLoading.value = true; // 开始加载
		// 调用你的验证码获取 API
		getCode(model.mailbox).then(res => {
			isLoading.value = false; // 结束加载
			if (res.code !== 1) {
				toast.warning(res.msg)
			} else {
				// 获取验证码成功
				toast.success('验证码已发送');
				isCounting.value = true;
				countdown.value = 60;

				const timer = setInterval(() => {
					countdown.value--;
					if (countdown.value <= 0) {
						clearInterval(timer);
						isCounting.value = false;
					}
				}, 1000);

			}
		}).catch(error => {
			// 处理登录失败的情况
			toast.error('服务器异常')
		});

	};

	// 表单验证对象
	const form = ref()
	// 表单模型，用于绑定输入框数据
	const model = reactive({
		// 邮箱
		mailbox: '',
		// 密码
		password: '',
		newPassword: '',
		// 验证码
		captcha: ''
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
					// 首先检查密码和确认密码是否相同
					if (model.password !== model.newPassword) {
						toast.warning('密码和确认密码必须一致');
						return;
					}
					// 调用登录API
					register(model)
						.then(res => {
							if (res.code !== 1) {
								toast.warning(res.msg)
							} else {
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
					<wd-input prop="mailbox" clearable prefix-icon="mail" v-model.trim="model.mailbox"
						placeholder="请输入邮箱"
						:rules="[{ required: false, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请填写正确的邮箱格式' }]"
						custom-class="custom-input" />
					<wd-input prop="captcha" v-model.trim="model.captcha" prefix-icon="chat1" use-suffix-slot
						placeholder="请输入邮箱验证码"
						:rules="[{ required: false,pattern: /^[A-Za-z0-9]{4}$/, message: '请填写4位数字或字母的验证码' }]"
						custom-class="custom-input">
						<template v-slot:suffix>
							<wd-loading v-if="isLoading" />
							<wd-button v-else size="small" @click="getCaptcha"
								:disabled="isCounting">{{ isCounting ? `${countdown}秒后重发` : '获取验证码' }}</wd-button>
						</template>
					</wd-input>
					<wd-input prop="password" show-password clearable prefix-icon="lock-on"
						v-model.trim="model.password" placeholder="请输入密码"
						:rules="[{ required: false, pattern: /^\S{6,12}$/, message: '请填写6-12位的密码' }]"
						custom-class="custom-input" />
					<wd-input prop="newPassword" show-password clearable prefix-icon="lock-on"
						v-model.trim="model.newPassword" placeholder="请输入确认密码"
						:rules="[{ required: false, pattern: /^\S{6,12}$/, message: '请填写6-12位的密码' }]"
						custom-class="custom-input" />
				</wd-cell-group>
				<view class="footer">
					<!-- 轻提示挂载点 -->
					<wd-toast />
					<wd-button type="primary" size="large" @click="handleSubmit" block>注册</wd-button>
				</view>
			</wd-form>
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
				padding-top: 110rpx;
			}

			.custom-input {
				padding: 20rpx 18rpx;
			}
		}
	}
</style>