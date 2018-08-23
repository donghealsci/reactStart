import React from 'react'
import ReactDOM from 'react-dom'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import avater from '../../../images/logo@3x.png'
import 'moment/locale/zh-cn'
import { connect } from 'react-redux'
import * as styles from './personalHead.scss'
import { Menu } from 'antd'
const MenuItemGroup = Menu.ItemGroup
const SubMenu = Menu.SubMenu

moment.locale('zh-cn')

class PersonalHead extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showLog: false
    }
  }
  logout () {
    this.setState({
      showLog: true
    })
  }
  cancelClick () {
    this.setState({
      showLog: false
    })
  }
  render () {
    const {picture, nickname} = this.props
    return (
      <Menu
        mode='horizontal'
        style={{ lineHeight: '64px', float: 'right', marginRight: '20px' }}
        >
        <SubMenu title={<span className={styles.avatar}><img src={picture || avater} alt='头像' /></span>}>
          <MenuItemGroup title={nickname || '登录用户'}>
            <Menu.Item key='logout'>
              <span onClick={this.logout.bind(this)}>退出登录</span>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <div className={styles.logCon} style={{display: this.state.showLog ? 'block' : 'none'}}>
          <form action='/setup/logout'>
            是否退出登录？
            <div className={styles.btnCon}>
              <input type='button' value='取消' onClick={this.cancelClick.bind(this)} />
              <input type='submit' value='确定' />
            </div>
          </form>
        </div>

      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  const {user} = state
  return {
    nickname: user.loginUser.nickname || '',
    picture: user.loginUser.picture || ''
  }
}

// const mapDispatchToProps = dispatch => {
// }

export default connect(mapStateToProps)(PersonalHead)
