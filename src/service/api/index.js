import  api from '../fetch/index';
// import {
//   api
// } from 'ik-fetch';
import {
  getTicket
} from '../login';
import entries from './entries';
import Header from '../config/header';
import Method from '../config/method';
import {
  encrypt,
  decrypt
} from './crypto';
import {
  getStore
} from '../common/store';

const header = Header.appId;

const apiEntry = {};

const combineConfig = () => {
  Object.keys(entries).forEach(key => {
    apiEntry[key] = async (config = {}) => {
      const ticket = await getTicket();

      const commonConfig = {
        header: Object.assign(header, {
          'X-Authorization-Id': ticket || ''
        })
      };

      const entry = entries[key];

      const request = Object.assign({}, entry, commonConfig, config, {
        headers: Object.assign({},
          entry.header,
          commonConfig.header,
          config.header
        )
      });

      // 接口统一处理好友绑定传share_uid
      const share_uid = getStore('share_uid');
      if (share_uid) {
        request.params = Object.assign(request.params || {}, {
          share_uid,
        })
      }

      if (entry.encrypt) {
        if (request.method === Method.GET) {
          console.error(`${key}:加密请求的 Method 必须要为 POST`);
          throw new Error(`${key}:加密请求的 Method 必须要为 POST`);
          return;
        }

        const IV = request.params ? request.params.encrypt : '';

        const {
          encryptIV,
          code
        } = encrypt(
          JSON.stringify(request.data || {}),
          IV
        );

        request.params = Object.assign(request.params || {}, {
          encrypt: encryptIV
        });
        request.data = {
          code
        };
      }
      // console.log(`=== Request -->  ${key}`);
      const response = await api(request);

      if (response.encrypt) {
        const {
          encrypt,
          data
        } = response;
        const decrypted = JSON.parse(decrypt(data, encrypt));
        return {
          data: decrypted,
          encrypt
        };
      }

      return response;
    };
  });
};

combineConfig();

export default apiEntry;