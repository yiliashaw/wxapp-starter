import FetchError from './error-creator';
import util from './util';
import wxapi from '../../utils/wx';

const process = config => {
  if (config.headers) { // axios use headers while wx use header
    config.header = config.headers;
  }

  if (config.baseURL && !util.isAbsoluteURL(config.url)) {
    config.url = util.combineURLs(config.baseURL, config.url);
  }

  if (config.defaultParams) {
    config.data = Object.assign({}, config.defaultParams, config.data);
  }

  if (config.params) {
    const query = util.concatParams(config.params);
    if (query) {
      config.url =
        config.url.indexOf('?') > -1 ?
        `${config.url}&${query}` :
        `${config.url}?${query}`;
    } else {
      // ignore
    }
  }

  config.method = config.method || 'GET';

  return config;
};

/**
 * Fetch API 定义一组与 async/await 配套使用的 http 请求接口。
 *
 *
 * @param {HttpRequest} request - 指定要发送 http 请求对象。
 * @param {FetchOptions?} options - 指定 fetch 配置选项。
 * @throws {FetchError}
 * @returns {Promise<HttpResponse>}
 */

export default async (request, options) => {

  const config = process(request);

  //console.log(`=== Start Fetching -->  URL: ${config.url}`);
  //console.log('=== Fetch Options -->', config);

  const response = await wxapi.request(config);
  const {
    data,
    header,
    statusCode,
    errMsg
  } = response;
  //console.log('=== Response --->', response);

  // 状态码错误
  const statusCodeValid = statusCode >= 200 && statusCode < 300;

  if (!statusCodeValid) {
    const error = {
      message: `Request failed with status code ${statusCode}`,
      code: statusCode,
      status: statusCode,
      config,
      header,
      data
    };

    console.error('=== Status Error --->', error);
    throw new FetchError(error);
  }

  /// 服务器响应了错误。
  const dataValid = data && !data.error_code && !data.dm_error;

  if (!dataValid) {
    const code = data ? data.error_code || data.dm_error : undefined;
    const message = data ? data.message || data.error_msg : 'Invalid response';
    const error = {
      message,
      config,
      code,
      header,
      data,
      status: statusCode
    };
    console.error(`=== Code Error --> ${code}: ${message}`);
    throw new FetchError(error);
  }

  //console.log('=== Response Data -->', data);
  return data;
};