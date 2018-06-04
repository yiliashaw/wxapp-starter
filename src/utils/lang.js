import api from '../service/api/index';

let config = null;

const getLangConfig = async () => {
  try {
    if (config) return config;

    const res = await api.getLangConfig({
      baseURL: 'https://mini.busi.inke.cn' // doc无法迁移到测试环境，所以baseURL固定写死到正式环境。
    });
    console.log('Lang', res.data);
    config = res.data;

    return config;
  } catch (error) {
    console.error('getTextConfig -->', error.message || error.errMsg);
  }

  return null;
};

export default getLangConfig;