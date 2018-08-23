import React from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'
import * as styles from './roleAdmin.scss'
import BtnGroups from 'components/BtnGroups'
import { Table, Popconfirm, Button, Row, Col, Input, Pagination,
  Select, Modal, message, Spin, Tag, Radio } from 'antd'
const Option = Select.Option

const RadioGroup = Radio.Group

moment.locale('zh-cn')

export default class RoleAdmin extends React.Component {
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
      roleCode: '',
      roleName: '',
      application: 'fakeApplication',
      description: '',
      roleNameAdd: '',
      roleCodeAdd: '',
      applicationAdd: 'fakeApplication',
      descriptionAdd: '',
      appCheckedItems: [],
      appCheckedUpdateItems: [],
      systemApplication: [],
      appCheckCode: 'hmp',
      selectedAppCode: 'all'
    }
    this.fakeState = null
    this.columns = [{
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    }, {
      title: '角色编号',
      dataIndex: 'roleCode',
      key: 'roleCode'
    }, {
      title: '项目名称',
      dataIndex: '项目名称',
      render: (text, record, index) => {
        return (
          <span>{record.systemApplication.name}</span>
        )
      }
    }, {
      title: '删除',
      dataIndex: '删除',
      render: (text, record, index) => {
        return (
          <Popconfirm title='确定删除该角色？' okText='确定' cancelText='取消' onClick={(e) => { this.stopPopGation(e) }} onCancel={(e) => { this.stopPopGation(e) }} onConfirm={(e) => this.onDelete(index, e)}>
            <a href='#'>删除</a>
          </Popconfirm>
        )
      }
    }]
  }

  componentWillMount () {
    const {setBreadCrumb, getRoleByPage, getAllAppRoles} = this.props
    setBreadCrumb('角色管理', '角色管理')
    getRoleByPage(0)
    getAllAppRoles()
  }

  handleRowClick (record, index) {
    const {id, roleName, roleCode, systemApplication} = record
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
    if (record.roleCode !== this.state.roleCode) {
      this.setState({
        id,
        roleCode,
        roleName,
        systemApplicationCode: systemApplication.applicationCode,
        systemApplicationName: systemApplication.name
      })
    }
  }

  stopPopGation (e) {
    e.stopPropagation()
    e.cancelBubble = true
  }

  onDelete (index, e) {
    this.stopPopGation(e)
    const {roleList, deleteRoleById, setRoleShowLoading} = this.props
    const {id, roleName} = roleList[index]
    setRoleShowLoading(true)
    deleteRoleById(id, roleName)
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
    const {addRole} = this.props
    const {roleNameAdd, roleCodeAdd, descriptionAdd, appCheckCode} = this.state
    if (roleNameAdd.trim() === '' || roleCodeAdd.trim() === '') {
      message.error('角色名称和角色编码均不能为空')
      return
    }
    if (appCheckCode.trim() === '') {
      message.error('请选择所属项目')
      return
    }
    addRole(roleCodeAdd, roleNameAdd, appCheckCode, descriptionAdd)
    this.setState({
      roleNameAdd: '',
      roleCodeAdd: '',
      applicationAdd: 'fakeApplication',
      descriptionAdd: '',
      modalVisible: false,
      appCheckCode: '',
      selectedIndex: -1
    })
  }

  handleModalCancel () {
    this.setState({
      modalVisible: false,
      appCheckCode: ''
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
      case 'roleName':
        this.setState({
          roleName: value
        })
        break
      case 'roleCode':
        this.setState({
          roleCode: value
        })
        break
      default:
        break
    }
  }

  changeAddTxt (type, e) {
    const {value} = e.target
    switch (type) {
      case 'roleName':
        this.setState({
          roleNameAdd: value
        })
        break
      case 'roleCode':
        this.setState({
          roleCodeAdd: value
        })
        break
      default:
        break
    }
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
    const {roleName, roleCode, systemApplicationCode} = this.fakeState
    this.setState({
      roleName,
      roleCode,
      systemApplicationCode
    })
    this.setState({
      showInfo: true,
      showUpdateInfo: false,
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false
    })
  }

  saveBtnClick () {
    const {updateRole} = this.props
    const {roleName, roleCode, description, id, currentPage, systemApplicationCode} = this.state
    if (roleName.trim() === '' || roleCode.trim() === '') {
      message.error('角色名称和角色编码均不能为空')
      return
    }
    if (systemApplicationCode.trim() === '') {
      message.error('请选择所属项目！')
      return
    }
    updateRole(currentPage, id, roleCode, roleName, systemApplicationCode, description)
    this.setState({
      showInfo: true,
      showUpdateInfo: false,
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false
    })
  }

  onPageChange (page) {
    const { getRoleByPage, setRoleShowLoading } = this.props
    const { selectedAppCode } = this.state
    const queryCode = selectedAppCode === 'all' ? '' : selectedAppCode
    setRoleShowLoading(true)
    getRoleByPage(page - 1, queryCode)
    this.setState({
      currentPage: page,
      selectedIndex: -1
    })
  }

  checkboxChange (e) {
    const value = e.target.value
    this.setState({
      appCheckCode: value
    })
  }

  checkboxModifyChange (e) {
    const {appList} = this.props
    const value = e.target.value
    let name = ''
    _.map(appList, (item, index) => {
      if (item['value'] === value) {
        name = item['label']
      }
    })
    this.setState({
      systemApplicationCode: value,
      systemApplicationName: name
    })
  }

  selectChange (value) {
    const { getRoleByPage, setRoleShowLoading } = this.props
    const queryCode = value === 'all' ? '' : value
    setRoleShowLoading(true)
    getRoleByPage(0, queryCode)
    this.setState({
      selectedAppCode: value,
      currentPage: 1,
      selectedIndex: -1
    })
  }

  render () {
    const { modalVisible, selectedIndex, currentPage, roleCode, roleName, roleNameAdd, systemApplicationCode,
      roleCodeAdd, systemApplicationName, appCheckCode } = this.state
    const {roleLoadingShow, roleList, roleCount, appList} = this.props
    return (
      <div>
        <div className={styles.wraper}>
          <Row className={styles.row}>
            <Col className={styles.title} span={2}>项目名称：</Col>
            <Col className={styles.content} span={5}>
              <Select defaultValue='all' style={{width: '200px'}} onChange={this.selectChange.bind(this)}>
                <Option value='all'>所有项目</Option>
                {
                  _.map(appList, (item, index) => {
                    return (
                      <Option key={index} value={item.value}>{item.label}</Option>
                    )
                  })
                }
              </Select>
            </Col>
            <Col className={styles.title} offset={14} span={1}>
              <Button onClick={this.addBtnClick.bind(this)} type='primary'>添加</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.tbCon}>
          {
            roleLoadingShow ? <Spin className={styles.spin} size='large' /> : null
          }
          <Table onRowClick={this.handleRowClick.bind(this)} dataSource={roleList} columns={this.columns}
            pagination={false} rowClassName={(record, index) => { return index === selectedIndex ? styles.selectedRow : '' }} />
        </div>
        <div className={styles.pageCon} style={{display: roleCount > 0 ? 'block' : 'none'}}>
          <Row>
            <Col offset={12} span={12}>
              <Pagination current={currentPage} onChange={this.onPageChange.bind(this)} pageSize={5} total={roleCount} />
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
            <Col className={styles.title} offset={2} span={3}>角色名称：</Col>
            <Col className={styles.content} span={7}>{roleName || '暂未填写'}</Col>
            <Col className={styles.title} span={3}>角色编码：</Col>
            <Col className={styles.content} span={3}>{roleCode || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={2} span={3}>所属项目：</Col>
            <Col className={styles.content} span={7}>
              <Tag>{systemApplicationName}</Tag>
            </Col>
          </Row>
        </div>
        <div className={styles.wraper} style={{display: this.state.showUpdateInfo ? 'block' : 'none'}}>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>* 角色名称：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写角色名称' value={roleName} onChange={this.changeTxt.bind(this, 'roleName')} />
            </Col>
            <Col className={styles.title} span={5}>* 角色编码：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写角色编码' value={roleCode} onChange={this.changeTxt.bind(this, 'roleCode')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>* 所属项目：</Col>
            <Col className={styles.content} span={6}>
              <RadioGroup options={appList} value={systemApplicationCode} onChange={this.checkboxModifyChange.bind(this)} />
            </Col>
          </Row>
        </div>
        <Modal title='添加角色' visible={modalVisible} okText='确定' cancelText='取消' width='960px'
          onOk={this.handleModalOk.bind(this)} onCancel={this.handleModalCancel.bind(this)}>
          <div className={styles.wraper}>
            <Row className={styles.row}>
              <Col className={styles.title} span={5}>* 角色名称： </Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='必填' value={roleNameAdd} onChange={this.changeAddTxt.bind(this, 'roleName')} />
              </Col>
              <Col className={styles.title} span={5}>* 角色编码：</Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='必填' value={roleCodeAdd} onChange={this.changeAddTxt.bind(this, 'roleCode')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={5}>* 所属项目：</Col>
              <Col className={styles.content} span={18}>
                <RadioGroup options={appList} value={appCheckCode} onChange={this.checkboxChange.bind(this)} />
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    )
  }
}
