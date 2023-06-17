import React, { useState } from 'react';
import { Card, Form, Button } from '@douyinfe/semi-ui';
import styles from './index.less';
import { IconKey, IconUser } from '@douyinfe/semi-icons';
import { history } from 'umi';
import imgUrl from '../../../public/login-white_02.jpg';
import { request } from '../../app';

export default function Login() {
  const [show, setShow] = useState(true);

  const handleLogin = async ({ name, password }) => {
    try {
      const response = await request.post('/api/auth/login', {
        data: {
          name: name,
          password: password,
        },
      });

      // 登录成功，处理响应数据
      console.log(response);
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('token', response?.access_token);
      history.replace('/home');
    } catch (error) {
      // 登录失败，处理错误
      console.error('Login failed', error);
    }
  };

  const validate1 = (val, values) => {
    if (!val) {
      return '请输入用户名';
    } else if (/(\s+)/g.test(val)) {
      return '不能有空格';
    }
    return '';
  };

  const validate2 = (val) => {
    if (!val) {
      return '请输入密码';
    } else if (/(\s+)/g.test(val)) {
      return '不能有空格';
    }
    return '';
  };

  return (
    <div className={styles.login}>
      <Card
        shadows="always"
        style={{
          width: 450,
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={imgUrl} alt="1" />
        <Form
          layout="vertical"
          labelPosition="left"
          labelAlign="right"
          labelWidth={60}
          style={{ width: 400 }}
          onSubmit={handleLogin}
        >
          <Form.Input
            field="name"
            prefix={<IconUser />}
            validate={validate1}
            label="用户名"
            placeholder="请输入用户名"
          />
          {show ? (
            <Form.Input
              field="password"
              prefix={<IconKey />}
              mode="password"
              validate={validate2}
              label="密码"
              placeholder="请输入密码"
            />
          ) : (
            <Form.Input
              field="newPassword"
              prefix={<IconKey />}
              mode="password"
              validate={validate2}
              label="新密码"
              placeholder="请输入新密码"
            />
          )}
          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <Button
              theme="borderless"
              onClick={() => setShow((x) => !x)}
              type="secondary"
            >
              {show ? '修改密码' : '登录'}
            </Button>
          </div> */}
          <Button
            style={{ marginTop: 15 }}
            type="primary"
            theme="solid"
            block
            htmlType="submit"
          >
            提交
          </Button>
        </Form>
      </Card>
    </div>
  );
}
