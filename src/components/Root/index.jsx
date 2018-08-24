import React from 'react'
// import 'antd/lib/date-picker/style/css'
import 'moment/locale/zh-cn'
// import * as styles from './root.scss'

export default class Root extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <div>
        这是root页面
        {this.props.children}
      </div>
    )
  }
}
