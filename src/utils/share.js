import {
	onShareAppMessage
} from '@dcloudio/uni-app';

export default {
	onShareAppMessage(res) {
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log(res.target)
		}
		return {
			title: '与你时刻，分享校园新鲜事~',
			path: '/pages/index/index'
		};
	}
};