import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Descriptions, Tag } from '@douyinfe/semi-ui';
import { IconArticle } from '@douyinfe/semi-icons';
import { Table } from '@douyinfe/semi-ui';
import { request } from '../../app';

const Home = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(async () => {
    const res = await request.post('/api/users/find', {
      data: {
        name: window.localStorage.getItem('name'),
      },
    });
    console.log(res);
    res.avatar = res.avatar.replace('./public/', '');
    setUserInfo(res);
  }, []);

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
    },
    {
      title: '考试科目',
      dataIndex: 'subject',
    },
    {
      title: '考试成绩',
      dataIndex: 'grade',
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <span>云南开放大学 {userInfo.period} 招生</span>：
        <strong>{userInfo.plan}</strong>
        <span className={styles.stud}>
          学籍状态：<span className={styles.status}>{userInfo.status}</span>
        </span>
      </div>
      <li className={styles.items}>
        <div className={styles.title}>
          <IconArticle
            style={{ color: '#FFD54F', fontSize: 19, marginLeft: 10 }}
          />
          <h3>学生基本信息</h3>
        </div>
        <div className={styles.content}>
          <Descriptions align="left">
            <Descriptions.Item itemKey="姓名">
              {userInfo.name}
            </Descriptions.Item>
            <Descriptions.Item itemKey="民族">
              {userInfo.status}
            </Descriptions.Item>
            <Descriptions.Item itemKey="证件类型">
              {userInfo.card_type}
            </Descriptions.Item>
            <Descriptions.Item itemKey="学习中心">
              {userInfo.base}
            </Descriptions.Item>
            <Descriptions.Item itemKey="中心电话">
              {userInfo.base_phone}
            </Descriptions.Item>
            <Descriptions.Item itemKey="通讯地址">
              {userInfo.address}
            </Descriptions.Item>
            <Descriptions.Item itemKey="邮政编码">
              {userInfo.postcode}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions align="left">
            <Descriptions.Item itemKey="性别">{userInfo.sex}</Descriptions.Item>
            <Descriptions.Item itemKey="政治面貌">
              {userInfo.politics}
            </Descriptions.Item>
            <Descriptions.Item itemKey="证件号">
              {userInfo.card_no}
            </Descriptions.Item>
            <Descriptions.Item itemKey="出生日期">
              {userInfo.born}
            </Descriptions.Item>
            <Descriptions.Item itemKey="移动电话">
              {userInfo.phone}
            </Descriptions.Item>
            <Descriptions.Item itemKey="Email">
              {userInfo.email}
            </Descriptions.Item>
          </Descriptions>
          <img className={styles.userIMG} src={userInfo.avatar} alt="无" />
        </div>
      </li>
      <li className={styles.items}>
        <div className={styles.title}>
          <IconArticle
            style={{ color: '#FFD54F', fontSize: 19, marginLeft: 10 }}
          />
          <h3>考试成绩汇总</h3>
        </div>
        <div className={styles.content}>
          <Table
            dataSource={[]}
            groupBy={'type'}
            bordered
            rowKey={'index'}
            columns={columns}
            pagination={false}
            renderGroupSection={(groupKey) => (
              <strong>第 {groupKey} 学期</strong>
            )}
            onGroupedRow={(group, index) => {
              return {
                onClick: (e) => {
                  console.log(`Grouped row clicked: `, group, index);
                },
              };
            }}
            clickGroupedRowToExpand // if you want to click the entire row to expand
          />
        </div>
      </li>
    </div>
  );
};
export default Home;
