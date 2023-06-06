


export function render(oldRender) {

  oldRender();
}

// 运行时配置
export const request = {
  // 统一的请求设定
  timeout: 2000,
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误接收及处理
    errorHandler: (error, opts) => {

    }
  },
  // 请求拦截器
  requestInterceptors: [
    (config) => {
      // 拦截请求配置，进行个性化处理。
      return { ...config};
    }
  ],
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      return response;
    }
  ]
};
