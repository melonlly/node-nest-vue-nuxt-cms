// 生产环境配置
export default () => ({
  mysql: {
    host: '10.0.4.12',
    port: 3306,
    username: 'root',
    password: 'Kushuye777:',
    database: 'sms-db',
    synchronize: false,
  },
});
