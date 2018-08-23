import React from 'react'
import 'antd/lib/date-picker/style/css'
import * as styles from './index.scss'
import bgimg from '../../images/bgindex.jpg'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: ''
    }
  }

  componentDidMount () {
    const {setBreadCrumb, getLoginUserInfo} = this.props
    getLoginUserInfo()
    setBreadCrumb('首页', '')
  }

  render () {
    return (
      <div className={styles.container}>
        <img src={bgimg} alt='背景图片' />
      </div>
    )
  }
}
