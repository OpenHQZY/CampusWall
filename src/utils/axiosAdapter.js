import axios from 'axios';
import settle from '../../node_modules/axios/lib/core/settle';
import buildURL from '../../node_modules/axios/lib/helpers/buildURL';

// 解决 uniapp 适配 axios 请求，避免报 adapter is not a function 错误
axios.defaults.adapter = function (config) {
  const { method } = config;
  return new Promise((resolve, reject) => {
    uni.request({
      url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      method: method ? method.toUpperCase() : 'GET', // 默认方法为 GET
      header: { ...config.headers },
      data: config.data,
      responseType: config.responseType,
      complete: function complete(response) {
        const { data, statusCode, errMsg, header } = response;
        const responseInfo = {
          data,
          status: statusCode,
          errMsg,
          header,
          config: config,
        };

        settle(resolve, reject, responseInfo);
      },
    });
  });
};

export default axios;
