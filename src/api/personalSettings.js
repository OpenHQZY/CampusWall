import request from '@/utils/request.js';
import {useCounterStore} from '@/stores/counter'

const counter = useCounterStore()
// 上传头像
export const OSSUpload = (userProfilePicture) => {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: counter.oss_url, // 你的上传接口
            filePath: userProfilePicture, // 文件路径
            name: 'file', // 后端接收文件的字段名
            success(res) {
                resolve(res); // 解析成功，解决 Promise
            },
            fail(err) {
                console.error('上传失败:', err);
                reject(err); // 上传失败，拒绝 Promise
            }
        });
    });
};

//修改用户名与头像
export const updateUserInformationAPI = (user) => {
    return request.put('/user/updateUserInformation', {
        'userName': user.userName,
        'userProfilePicture': user.userProfilePicture
    })
}