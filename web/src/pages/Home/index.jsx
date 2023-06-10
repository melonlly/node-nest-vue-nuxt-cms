import React, {useState} from 'react';
import styles from './index.less';
import {Descriptions, Tag} from '@douyinfe/semi-ui';
import {IconArticle} from "@douyinfe/semi-icons";
import {Table} from '@douyinfe/semi-ui';

const Home = () => {
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
        <span>云南开放大学 2023年 春季招生</span>：<strong>军地联合培养方案（2）</strong>
        <span className={styles.stud}>学籍状态：<span className={styles.status}>在籍</span></span>
      </div>
      <li className={styles.items}>
        <div className={styles.title}>
          <IconArticle style={{color: '#FFD54F', fontSize: 19, marginLeft: 10}}/><h3>学生基本信息</h3>
        </div>
        <div className={styles.content}>
          <Descriptions align="left">
            <Descriptions.Item itemKey="姓名">1,480,000</Descriptions.Item>
            <Descriptions.Item itemKey="民族">98%</Descriptions.Item>
            <Descriptions.Item itemKey="证件类型">3级</Descriptions.Item>
            <Descriptions.Item itemKey="学习中心">电商</Descriptions.Item>
            <Descriptions.Item itemKey="中心电话">未认证</Descriptions.Item>
            <Descriptions.Item itemKey="通讯地址">未认证</Descriptions.Item>
            <Descriptions.Item itemKey="邮政编码">未认证</Descriptions.Item>
          </Descriptions>
          <Descriptions align="left">
            <Descriptions.Item itemKey="性别">1,480,000</Descriptions.Item>
            <Descriptions.Item itemKey="政治面貌">98%</Descriptions.Item>
            <Descriptions.Item itemKey="证件号">3级</Descriptions.Item>
            <Descriptions.Item itemKey="出生日期">电商</Descriptions.Item>
            <Descriptions.Item itemKey="移动电话">未认证</Descriptions.Item>
            <Descriptions.Item itemKey="Email">未认证</Descriptions.Item>
          </Descriptions>
          <img className={styles.userIMG} src='/' alt="无"/>
        </div>
      </li>
      <li className={styles.items}>
        <div className={styles.title}>
          <IconArticle style={{color: '#FFD54F', fontSize: 19, marginLeft: 10}}/><h3>考试成绩汇总</h3>
        </div>
        <div className={styles.content}>
          <Table
            dataSource={[{index: 1, subject: '高数', grade: 105, type: 1}, {
              index: 2,
              subject: '语文',
              grade: 105,
              type: 2
            }]}
            groupBy={'type'}
            bordered
            rowKey={'index'}
            columns={columns}
            pagination={false}
            renderGroupSection={groupKey => <strong>第 {groupKey} 学期</strong>}
            onGroupedRow={(group, index) => {
              return {
                onClick: e => {
                  console.log(`Grouped row clicked: `, group, index);
                },
              };
            }}
            clickGroupedRowToExpand // if you want to click the entire row to expand
          />
        </div>
      </li>
    </div>
  )
}
export default Home
