<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		useToast
	} from 'wot-design-uni';

	// 身份
	const value = ref(1)
	// 步骤条进度
	const active = ref(0)

	// 表单数据
	const model = reactive({
		// 学号
		studentID: '',
		// 身份证后6位
		identityCard: ''
	});

	// 表单
	const form = ref()

	// 调用 useToast() 函数：获取一个对象
	const {
		success: showSuccess
	} = useToast()

	//表单提交函数
	const handleSubmit = () => {
		form.value
			.validate()
			.then(({
				valid,
				errors
			}) => {
				if (valid) {
					active.value++
					showSuccess({
						msg: '校验通过'
					})
				}
			})
			.catch((error) => {
				console.log(error, 'error')
			})
	}
	// 返回到上一级页面
	const goBack = () => {
		uni.navigateBack();
	};
	
</script>

<template>
	<!-- 校园认证 -->
	<view class="campus-auth">
		<!-- 背景盒子 -->
		<view class="background-box">
			<!-- 步骤条 -->
			<wd-steps :active="active" align-center>
				<wd-step title="选择身份" />
				<wd-step title="完善信息" />
				<wd-step title="认证完成" />
			</wd-steps>
			<!-- 第一部分：选择身份 -->
			<view v-show="active === 0" class="step-one" >
				<wd-radio-group v-model="value" shape="dot">
					<!-- 学生认证 -->
					<view class="student-auth" :class="{ 'selected': value === 1 }">
						<wd-radio :value="1">学生</wd-radio>
					</view>
					<!-- 教师认证 -->
					<view class="teacher-auth" :class="{ 'selected': value === 2 }">
						<wd-radio :value="2">教师</wd-radio>
					</view>
				</wd-radio-group>
				<!-- 下一步按钮 -->
				<view class="step-button">
					<wd-button size="large" @click="active++">下一步</wd-button>
				</view>
			</view>

			<!-- 第二部分：完善信息 -->
			<view v-show="active === 1" class="step-two">
				<wd-form ref="form" :model="model" errorType="message">
					<wd-cell-group border>
						<wd-input label="学号" label-width="50px" prop="studentID" clearable v-model="model.studentID"
							placeholder="请输入学号"
							:rules="[{ required: false, pattern: /^\d{12}$/, message: '请输入12位的学号' }]" />
						<wd-input label="身份证" label-width="50px" prop="identityCard" show-password clearable
							v-model="model.identityCard" placeholder="请输入身份证后6位"
							:rules="[{ required: false, pattern: /^[A-Za-z0-9]{6}$/, message: '请填写身份证后6位' }]" />
					</wd-cell-group>
					<view class="footer">
						<!-- 轻提示挂载点 -->
						<wd-toast />
						<wd-button size="large" @click="active--">上一步</wd-button>
						<wd-button type="primary" size="large" @click="handleSubmit">提交认证</wd-button>
					</view>
				</wd-form>
			</view>

			<!-- 第三部分：认证完成 -->
			<view v-show="active === 2" class="step-three">
				<!-- 认证完成按钮 -->
				<view class="certification-success">
					<view class="certification-message">
						<image src="../../static/my/certificationPassed.png"></image>
						<view class="text">恭喜您, 认证完成</view>
					</view>
					<view class="certification-button">
						<wd-button size="large" @click="goBack">返回个人主页</wd-button>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<style lang="scss">
	.campus-auth {
		height: 100vh;
		background-color: rgb(242, 246, 249);
		padding-top: 30rpx;

		// 背景盒子
		.background-box {
			height: 90vh;
			width: 90vw;
			background-color: rgb(255, 255, 255);
			margin: 40rpx;
			border-radius: 20rpx;

			// 步骤条	
			.wd-steps {
				padding: 50rpx;
			}

			// 学生与老师认证
			.student-auth,
			.teacher-auth {
				background-color: rgb(243, 243, 243);
				padding: 50rpx;
				padding-bottom: 70rpx;
				margin: 50rpx 30rpx;
				border-radius: 20rpx;
				transition: background-color 0.3s ease;

				// 组件内部样式修改
				.wd-radio__label {
					color: rgb(146, 146, 146);
				}
			}

			// 当选择时需要改变的样式
			.selected {
				background-color: rgb(54, 110, 244);

				.wd-radio__label {
					font-weight: bold;
					color: rgb(242, 243, 255);
				}
			}

			// 下一步按钮
			.step-button {
				display: flex;
				padding-top: 50rpx;
			}
			
			// 提交认证按钮
			.footer{
				padding-top: 250rpx;
				display: flex;
			}
			
			.certification-success{
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 110rpx;
				
				.certification-message{
					display: flex;
					flex-direction: column;
					align-items: center;
					image{
						width: 110rpx;
						/* 根据需要调整图片大小 */
						height: 110rpx;
						/* 根据需要调整图片大小 */
						border-radius: 50%;
					}
					.text{
						padding-top: 50rpx;
						font-weight: bold;
					}
				}
				.certification-button{
					padding-top: 220rpx;
				}
			}
		}
	}
</style>