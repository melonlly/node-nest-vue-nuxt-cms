// 生产环境配置
export default () => ({
  mysql: {
    host: 'sh-cynosdbmysql-grp-jgarzx84.sql.tencentcdb.com',
    port: 21954 || 3306,
    username: 'root',
    password: 'kushuye777',
    database: 'sms-db',
    synchronize: false,
  },
});
