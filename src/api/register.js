import request from '@/utils/request.js';

// 获取验证码api
export const getCode = (mailbox) => {
	return request.get(`/user/getCode/${mailbox}`)
}

export const register = (model) => {
	return request.post('/user/register',{
		'userMailbox': model.mailbox,
		'userPassword': model.password,
		'userCode': model.captcha
	})
}

