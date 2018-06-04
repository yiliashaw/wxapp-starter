
export default class FetchError extends __builtin(Error) {   // 踩坑注意： Error不能直接extends
  /**
   * 创建一个 FetchError 类型的实例对象。
   * @param {String} message - 错误消息。
   */
  constructor(options) {
    const { message, config, code, header, data, status } = options;

    super(message);

    this.message = message;
    this.config = config;
    this.code = code;
    this.header = header;
    this.data = data;
    this.status = status;
  }
}

function __builtin(cls) {
  function ExtendableBuiltin() {
    var instance = new cls(...arguments);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}
