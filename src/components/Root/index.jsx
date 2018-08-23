import React from 'react'
import 'antd/lib/date-picker/style/css'
import avater from '../../images/logo@3x.png'
import 'moment/locale/zh-cn'
import * as styles from './root.scss'
import PersonalHead from './PersonalHead'
import { Breadcrumb, Button, Layout, Icon } from 'antd'
import LeftBar from '../LeftBar'
const { Header, Content, Footer, Sider } = Layout

export default class Root extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  toggleCollapsed () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  componentDidMount () {
    // todo 动态获取左边菜单
    const {getLeftMenu} = this.props
    getLeftMenu()
  }

  render () {
    const {firstNav, secondNav, menuList} = this.props
    return (
      <div>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            breakpoint='lg'
            collapsed={this.state.collapsed}
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            {
              this.state.collapsed ? <div className={styles.logoImg}><img src={avater} alt='头像' /></div> : <div className={styles.logo}>用户管理系统</div>
            }
            <LeftBar menus={menuList} collapsed={this.state.collapsed} />
          </Sider>
          <Layout style={{ marginLeft: this.state.collapsed ? 70 : 200 }}>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Button type='primary' onClick={this.toggleCollapsed.bind(this)} style={{ marginLeft: 16 }}>
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
              </Button>
              <PersonalHead />
            </Header>
            <Content style={{ margin: '12px 16px 0', overflow: 'initial' }}>
              <Breadcrumb style={{marginBottom: '12px'}}>
                <Breadcrumb.Item>{firstNav}</Breadcrumb.Item>
                <Breadcrumb.Item>{secondNav}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', textAlign: 'center', minHeight: '800px' }}>
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              © 2017 北京和兴创联健康科技有限公司版权所有 （京ICP备17021752号）
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}
