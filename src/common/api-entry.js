import Method from '../service/config/method';
import Host from '../service/config/host';

export default {
  sendFormId: {
    baseURL: Host.mini,
    method: Method.GET,
    url: '/msg/receive'
  },
  getLangConfig: {
    baseURL: Host.mini,
    method: Method.GET,
    url: '/common/doc'
  },
  sendCustomerMsg: {
    baseURL: Host.mini,
    method: Method.GET,
    url: '/msg/send_customer_msg'
  },
  sendHeartbeat: {
    baseURL: Host.mini,
    method: Method.POST,
    url: '/log/report'
  }
};