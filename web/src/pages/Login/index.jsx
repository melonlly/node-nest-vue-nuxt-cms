import React, { useState } from 'react';
import { Card, Form, Button } from '@douyinfe/semi-ui';
import styles from './index.less';
import { IconKey, IconUser } from '@douyinfe/semi-icons';

export default function Login() {
  const [show,setShow] = useState(true);

  const handleSubmit =(values) => {

  }

  const validate1 = (val, values) => {
    if(!val){
      return '请输入用户名';
    }else if(/(\s+)/g.test(val)){
      return '不能有空格';
    }
    return '';
  }

  const validate2 = (val) => {
    if(!val){
      return '请输入密码';
    }else if(/(\s+)/g.test(val)){
      return '不能有空格';
    }
    return '';
  }

  return (
    <div className={ styles.login }>
      <Card shadows='always'
            style={{ width: 450,height:300,display:'flex', alignItems:'center',justifyContent:'center'}}>
        <Form layout='vertical'
              labelPosition='left'
              labelAlign='right'
              labelWidth={60}
              style={{ width: 400 }}
              onSubmit={handleSubmit}>
          <Form.Input field='username'
                      prefix={<IconUser />}
                      validate={validate1}
                      label='用户名'  placeholder='请输入用户名'/>
          {
            show ? (
              <Form.Input field='password'
                          prefix={<IconKey />}
                          mode="password"
                          validate={validate2}
                          label='密码' placeholder='请输入密码'/>
            ) : (
              <Form.Input field='newPassword'
                          prefix={<IconKey />}
                          mode="password"
                          validate={validate2}
                          label='新密码' placeholder='请输入新密码'/>
            )
          }
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <Button theme='borderless' onClick={()=>setShow(x=>!x)} type='secondary'>{ show ? '修改密码' : '登录'}</Button>
          </div>
          <Button style={{ marginTop:15 }} type='primary' theme='solid'  block htmlType='submit'>提交</Button>
        </Form>
      </Card>
    </div>
  );
}
