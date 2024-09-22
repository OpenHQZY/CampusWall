<script setup>
	import { ref } from 'vue';
	
	// 身份
	const value = ref(1)
	// 步骤条进度
	const active = ref(0)
	const nextStep = () =>{
		active.value = active.value + 1
	}
</script>

<template>
	<!-- 校园认证 -->
	<view class="campus-auth">
		<!-- 背景盒子 -->
		<view class="background-box">
			<wd-steps :active="active" align-center>
			  <wd-step title="选择身份"/>
			  <wd-step title="完善信息"/>
			  <wd-step title="认证完成"/>
			</wd-steps>
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
				<wd-button size="large" @click="nextStep">下一步</wd-button>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	.campus-auth{
		height: 100vh;
		background-color: rgb(242, 246, 249);
		padding-top: 30rpx;
		// 背景盒子
		.background-box{
			height: 90vh;
			width: 90vw;
			background-color: rgb(255,255,255);
			margin: 40rpx;
			border-radius: 20rpx; 
			.wd-steps{
				padding: 50rpx;
			}
			// 学生与老师认证
			.student-auth,.teacher-auth{
				background-color: rgb(243, 243, 243);
				padding: 50rpx;
				padding-bottom: 70rpx;
				margin: 50rpx 30rpx;
				border-radius: 20rpx; 
				// 组件内部样式修改
				.wd-radio__label{
					color: rgb(146, 146, 146);
				}
			}
			// 当选择时需要改变的样式
			.selected {
			  background-color: rgb(54, 110, 244);
			  .wd-radio__label{
			  	font-weight: bold;
			  	color: rgb(242, 243, 255);
			  }
			}
			// 下一步按钮
			.step-button{
				display: flex;
				padding-top: 50rpx;
			}
		}
	}
</style>
