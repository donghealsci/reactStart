import React from 'react'
import 'moment/locale/zh-cn'
import * as styles from './modifyPassword.scss'
import { Button, Row, Col, Input, message } from 'antd'

export default class ModifyPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      originPass: '',
      newPass: '',
      newPassConfirm: ''
    }
  }

  componentWillMount () {
    const {setBreadCrumb} = this.props
    setBreadCrumb('个人中心', '修改密码')
  }

  addBtnClick () {
    this.setState({
      modalVisible: true
    })
  }

  changeAddTxt (type, e) {
    const {value} = e.target
    switch (type) {
      case 'originPass':
        this.setState({
          originPass: value
        })
        break
      case 'newPass':
        this.setState({
          newPass: value
        })
        break
      case 'newPassConfirm':
        this.setState({
          newPassConfirm: value
        })
        break
      default:
        break
    }
  }

  clearPass () {
    this.setState({
      originPass: '',
      newPass: '',
      newPassConfirm: ''
    })
  }

  changePass () {
    const {originPass, newPass, newPassConfirm} = this.state
    const {modifySelfPass} = this.props
    if (originPass.trim() === '' || newPass.trim() === '' || newPassConfirm === '') {
      message.error('原始密码和新密码均不能为空！')
      return
    }
    if (newPass !== newPassConfirm) {
      message.error('新密码和确认密码必须相同！')
      return
    }
    if (originPass === newPass) {
      message.error('新密码不能与原始密码相同！')
      return
    }
    modifySelfPass(originPass, newPass)
    // message.success('修改密码成功！')
  }

  render () {
    const {originPass, newPass, newPassConfirm} = this.state
    return (
      <div>
        <div className={styles.wraper}>
          <Row className={styles.row}>
            <Col className={styles.title} offset={8} span={3}>原密码：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='必填' type='password' value={originPass} onChange={this.changeAddTxt.bind(this, 'originPass')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={8} span={3}>新密码：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='必填' type='password' value={newPass} onChange={this.changeAddTxt.bind(this, 'newPass')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={8} span={3}>确认新密码：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='必填' type='password' value={newPassConfirm} onChange={this.changeAddTxt.bind(this, 'newPassConfirm')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.btnContainer} offset={8} span={8}>
              <Button style={{marginRight: '20px'}} onClick={this.clearPass.bind(this)}>
                清空
              </Button>
              <Button type='primary' onClick={this.changePass.bind(this)}>
                修改
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
