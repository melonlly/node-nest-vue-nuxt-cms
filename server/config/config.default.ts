import configLocal from './config.local';
import configProd from './config.prod';
import configUnittest from './config.unittest';

console.log(process.env.FM_SERVER_ENV);

// 默认配置 - 会自动合并运行环境配置。
export default () =>
  Object.assign(
    // 默认配置
    {
      // 项目启动端口
      port: 3000,
      // 数据库配置
      mysql: {
        // host: '124.222.251.11',
        // host: 'localhost',
        host: 'sh-cynosdbmysql-grp-jgarzx84.sql.tencentcdb.com',
        port: 21954,
        // host: '10.0.4.12',
        // port: 3306,
        username: 'root',
        password: '',
        database: 'sms-db',
        synchronize: false,
      },
    },
    {
      local: configLocal,
      prod: configProd,
      unittest: configUnittest,
    }[process.env.FM_SERVER_ENV](),
  );
