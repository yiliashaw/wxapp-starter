const Source = {
  test: {
    mini: 'https://testmini.busi.inke.cn',
  },
  beta: {
    mini: 'https://betamini.busi.inke.cn',
  },
  prod: {
    mini: 'https://mini.busi.inke.cn',
  }
};


const env = process.env.NODE_ENV;

let Host;

if (env === 'development') {
  Host = Source.test;
} else if (env === 'experience') {
  Host = Source.beta;
} else {
  Host = Source.prod;
}

console.warn('Current Host ==>  ', Host);

export default Host;
