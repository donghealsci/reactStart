import React from 'react'
import { Layout } from 'antd'
// import { menus } from '../../constants/meun'
import SiderMenu from '../SiderMenu'
const { Sider } = Layout

export default class LeftBar extends React.Component {
  render () {
    const {collapsed, menus} = this.props
    return (
      <Sider
        trigger={null}
        collapsible
        breakpoint='lg'
        collapsed={collapsed}
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <SiderMenu menus={menus} theme='dark' mode='inline' />
      </Sider>
    )
  }
}
