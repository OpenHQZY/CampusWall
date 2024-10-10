import request from '@/utils/request.js';

export const login = (model) => {
	return request.get("/user/login", {
		params: {
			userMailbox: model.mailbox,
			userPassword: model.password
		}
	})
}
