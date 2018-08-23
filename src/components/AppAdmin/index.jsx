import React from 'react'
import * as styles from './appAdmin.scss'
import BtnGroups from 'components/BtnGroups'
// import {Button} from 'antd'
import { Table, Popconfirm, Button, Row, Col, Input, Pagination, Modal, message, Spin } from 'antd'

export default class AppAdmin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      btnAddShow: true,
      btnModifyShow: false,
      btnCancelShow: false,
      btnSaveShow: false,
      showInfo: false,
      showUpdateInfo: false,
      modalVisible: false,
      selectedIndex: -1,
      currentPage: 1,
      id: '',
      name: '',
      applicationCode: '',
      nameAdd: '',
      applicationCodeAdd: '',
      queryAppName: '',
      queryAppCode: ''
    }
    this.fakeState = null
    this.columns = [{
      title: '项目名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '项目编号',
      dataIndex: 'applicationCode',
      key: 'applicationCode'
    }, {
      title: '删除',
      dataIndex: '删除',
      render: (text, record, index) => {
        return (
          <Popconfirm title='确定删除该项目？' okText='确定' cancelText='取消' onClick={(e) => { this.stopPopGation(e) }} onCancel={(e) => { this.stopPopGation(e) }} onConfirm={(e) => this.onDelete(index, e)}>
            <a href='#'>删除</a>
          </Popconfirm>
        )
      }
    }]
  }

  componentWillMount () {
    const {setBreadCrumb, getAppByPage} = this.props
    const {queryAppName, queryAppCode} = this.state
    setBreadCrumb('项目管理', '项目管理')
    getAppByPage(0, queryAppName, queryAppCode)
  }

  handleRowClick (record, index) {
    const {id, name, applicationCode} = record
    this.setState({
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false,
      selectedIndex: index
    })
    if (!this.state.showInfo) {
      this.setState({
        showInfo: true,
        showUpdateInfo: false
      })
    }
    if (id !== this.state.id) {
      this.setState({
        id,
        name,
        applicationCode
      })
    }
  }

  stopPopGation (e) {
    e.stopPropagation()
    e.cancelBubble = true
  }

  onDelete (index, e) {
    this.stopPopGation(e)
    const {deleteAppById, appList, setAppShowLoading} = this.props
    const {id, name} = appList[index]
    setAppShowLoading(true)
    deleteAppById(id, name)
    this.setState({
      currentPage: 1,
      selectedIndex: -1
    })
    if (id === this.state.id) {
      this.setState({
        btnModifyShow: false,
        btnCancelShow: false,
        btnSaveShow: false,
        showInfo: false,
        showUpdateInfo: false
      })
    }
  }

  handleModalOk () {
    const {addApp} = this.props
    const {applicationCodeAdd, nameAdd} = this.state
    if (applicationCodeAdd.trim() === '' || nameAdd.trim() === '') {
      message.error('项目名称和编号均不能为空！')
      return
    }
    addApp(applicationCodeAdd, nameAdd)
    this.setState({
      applicationCodeAdd: '',
      nameAdd: '',
      modalVisible: false,
      selectedIndex: -1
    })
  }

  handleModalCancel () {
    this.setState({
      modalVisible: false
    })
  }

  addBtnClick () {
    this.setState({
      modalVisible: true
    })
  }

  changeTxt (type, e) {
    const {value} = e.target
    switch (type) {
      case 'name':
        this.setState({
          name: value
        })
        break
      case 'applicationCode':
        this.setState({
          applicationCode: value
        })
        break
      case 'queryAppName':
        this.setState({
          queryAppName: value
        })
        break
      case 'queryAppCode':
        this.setState({
          queryAppCode: value
        })
        break
      default:
        break
    }
  }

  changeAddTxt (type, e) {
    const {value} = e.target
    switch (type) {
      case 'name':
        this.setState({
          nameAdd: value
        })
        break
      case 'applicationCode':
        this.setState({
          applicationCodeAdd: value
        })
        break
      default:
        break
    }
  }

  queryBtnClick () {
    const {getAppByPage, setAppShowLoading} = this.props
    const {queryAppName, queryAppCode} = this.state
    setAppShowLoading(true)
    getAppByPage(0, queryAppName, queryAppCode)
    this.setState({
      showInfo: false,
      showUpdateInfo: false,
      btnModifyShow: false,
      btnCancelShow: false,
      btnSaveShow: false,
      selectedIndex: -1,
      currentPage: 1
    })
  }

  modifyBtnClick () {
    this.setState({
      showInfo: false,
      showUpdateInfo: true,
      btnModifyShow: false,
      btnCancelShow: true,
      btnSaveShow: true
    })
    this.fakeState = JSON.parse(JSON.stringify(this.state))
  }

  cancelBtnClick () {
    const {name, applicationCode} = this.fakeState
    this.setState({
      showInfo: true,
      showUpdateInfo: false,
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false,
      name,
      applicationCode
    })
  }

  saveBtnClick () {
    const {updateApp} = this.props
    const {name, applicationCode, id, currentPage} = this.state
    if (applicationCode.trim() === '' || name.trim() === '') {
      message.error('项目名称和编号均不能为空！')
      return
    }
    updateApp(currentPage, id, applicationCode, name)
    this.setState({
      showInfo: true,
      showUpdateInfo: false,
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false
    })
  }

  onPageChange (page) {
    const {getAppByPage, setAppShowLoading} = this.props
    const {queryAppName, queryAppCode} = this.state
    setAppShowLoading(false)
    getAppByPage(page - 1, queryAppName, queryAppCode)
    this.setState({
      currentPage: page,
      selectedIndex: -1
    })
  }

  render () {
    const { modalVisible, selectedIndex, currentPage, name, applicationCode,
      nameAdd, applicationCodeAdd, queryAppName, queryAppCode } = this.state
    const {appLoadingShow, appList, appCount} = this.props
    return (
      <div>
        <div className={styles.wraper}>
          <Row className={styles.row}>
            <Col className={styles.title} span={2}>项目名称：</Col>
            <Col className={styles.content} span={3}>
              <Input placeholder='输入项目名称搜索' value={queryAppName} onChange={this.changeTxt.bind(this, 'queryAppName')} />
            </Col>
            <Col className={styles.title} span={2}>项目编号：</Col>
            <Col className={styles.content} span={3}>
              <Input placeholder='输入项目编号搜索' value={queryAppCode} onChange={this.changeTxt.bind(this, 'queryAppCode')} />
            </Col>
            <Col className={styles.title} offset={9} span={1}>
              <Button type='primary' onClick={this.queryBtnClick.bind(this)}>查询</Button>
            </Col>
            <Col className={styles.title} offset={1} span={1}>
              <Button onClick={this.addBtnClick.bind(this)} type='primary'>添加</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.tbCon}>
          {
            appLoadingShow ? <Spin className={styles.spin} size='large' /> : null
          }
          <Table onRowClick={this.handleRowClick.bind(this)} dataSource={appList} columns={this.columns}
            pagination={false} rowClassName={(record, index) => { return index === selectedIndex ? styles.selectedRow : '' }} />
        </div>
        <div className={styles.pageCon} style={{display: appCount > 0 ? 'block' : 'none'}}>
          <Row>
            <Col offset={12} span={12}>
              <Pagination current={currentPage} onChange={this.onPageChange.bind(this)} pageSize={5} total={appCount} />
            </Col>
          </Row>
        </div>
        <div>
          <Row className={styles.btnCon}>
            <Col offset={8} span={8}>
              <BtnGroups showModify={this.state.btnModifyShow} showCancel={this.state.btnCancelShow}
                showSave={this.state.btnSaveShow} onModifyClick={this.modifyBtnClick.bind(this)}
                onCancelClick={this.cancelBtnClick.bind(this)} onSaveClick={this.saveBtnClick.bind(this)} />
            </Col>
          </Row>
        </div>
        <div className={styles.wraper} style={{display: this.state.showInfo ? 'block' : 'none'}}>
          <Row className={styles.row}>
            <Col className={styles.title} offset={2} span={3}>项目名称：</Col>
            <Col className={styles.content} span={7}>{name || '暂未填写'}</Col>
            <Col className={styles.title} span={3}>项目编号：</Col>
            <Col className={styles.content} span={3}>{applicationCode || '暂未填写'}</Col>
          </Row>
        </div>
        <div className={styles.wraper} style={{display: this.state.showUpdateInfo ? 'block' : 'none'}}>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>* 项目名称：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写项目名称' value={name} onChange={this.changeTxt.bind(this, 'name')} />
            </Col>
            <Col className={styles.title} span={5}>* 项目编号：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填项目编号' value={applicationCode} onChange={this.changeTxt.bind(this, 'applicationCode')} />
            </Col>
          </Row>
        </div>
        <Modal title='添加项目' visible={modalVisible} okText='确定' cancelText='取消' width='960px'
          onOk={this.handleModalOk.bind(this)} onCancel={this.handleModalCancel.bind(this)}>
          <div className={styles.wraper}>
            <Row className={styles.row}>
              <Col className={styles.title} span={5}>* 项目名称： </Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='必填' value={nameAdd} onChange={this.changeAddTxt.bind(this, 'name')} />
              </Col>
              <Col className={styles.title} span={5}>* 项目编号：</Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='必填' value={applicationCodeAdd} onChange={this.changeAddTxt.bind(this, 'applicationCode')} />
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    )
  }
}
