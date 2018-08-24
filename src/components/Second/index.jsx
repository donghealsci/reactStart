import React from 'react'
import 'antd/lib/date-picker/style/css'
// import * as styles from './index.scss'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    const {setBreadCrumb} = this.props
    setBreadCrumb('第二个页面', '第二个页面')
  }

  render () {
    return (
      <div>
        这是第二个页面
      </div>
    )
  }
}
