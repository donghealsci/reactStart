import React from 'react'
import * as styles from './userAdmin.scss'
import BtnGroups from 'components/BtnGroups'
import { Table, Popconfirm, Button, Row, Col, Input, Pagination, Modal, message, Tree, Spin, Radio } from 'antd'
const RadioGroup = Radio.Group
const {TreeNode} = Tree

export default class UserAdmin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: -1,
      btnModifyShow: false,
      btnCancelShow: false,
      btnSaveShow: false,
      showInfo: false,
      showUpdateInfo: false,
      modalVisible: false,
      showImportModal: false,
      userId: '',
      username: '',
      password: '',
      phoneNumber: '',
      email: '',
      nickname: '',
      name: '',
      employer: '',
      department: '',
      title: '',
      groupRoles: [],
      usernameAdd: '',
      passwordAdd: '',
      phoneNumberAdd: '',
      emailAdd: '',
      nicknameAdd: '',
      nameAdd: '',
      employerAdd: '',
      departmentAdd: '',
      titleAdd: '',
      passwordConfirmAdd: '',
      groupRolesAdd: [],
      currentPage: 1,
      systemApplications: [],
      modifyCheckKeys: [],
      showPassModal: false,
      changePass: '',
      changePassIndex: null,
      queryUserName: '',
      queryPhoneNumber: '',
      queryUserId: '',
      importTypeValue: 'doctor',
      importLoadingShow: false,
      importInfoShow: false,
      importInfo: ''
    }
    this.importType = [{label: '医生', value: 'doctor'}, {label: '患者', value: 'patient'}]
    this.fakeState = null
    this.addGroups = []
    this.columns = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname'
    }, {
      title: '电话',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    }, {
      title: '禁/启用',
      dataIndex: '禁用',
      render: (text, record, index) => {
        const banState = record.enabled ? '禁用' : '启用'
        const textInfo = `确定${banState}该用户？`
        return (
          <Popconfirm title={textInfo} okText='确定' cancelText='取消' onClick={(e) => { this.stopPopGation(e) }} onCancel={(e) => { this.stopPopGation(e) }} onConfirm={(e) => this.banStartUser(index, e)}>
            <a href='#'>{
              record.enabled ? '禁用' : '启用'
            }</a>
          </Popconfirm>
        )
      }
    }, {
      title: '操作',
      dataIndex: '操作',
      render: (text, record, index) => {
        return (
          <span>
            <a onClick={(e) => this.modifyPass(index, e)}>修改密码</a>
            &nbsp;&nbsp;
            <Popconfirm title='确定删除该用户？' okText='确定' cancelText='取消' onClick={(e) => { this.stopPopGation(e) }} onCancel={(e) => { this.stopPopGation(e) }} onConfirm={(e) => this.onDelete(index, e)}>
              <a href='#'>删除</a>
            </Popconfirm>
          </span>

        )
      }
    }]
  }

  componentWillMount () {
    const {setBreadCrumb, getUserByPage, getAllAppRoles} = this.props
    const {queryUserId, queryUserName, queryPhoneNumber} = this.state
    getUserByPage(0, queryUserId, queryUserName, queryPhoneNumber)
    getAllAppRoles()
    setBreadCrumb('用户管理', '用户管理')
  }

  componentWillReceiveProps (nextProps) {
    const {userRoles, importLoadingShow, importInfoShow, importInfo} = nextProps
    if (this.props.userRoles !== nextProps.userRoles) {
      this.setState({
        systemApplications: userRoles
      })
    }
    if (this.state.importLoadingShow !== importLoadingShow) {
      this.setState({
        importLoadingShow
      })
    }
    if (this.state.importInfoShow !== importInfoShow) {
      this.setState({
        importInfo,
        importInfoShow
      })
    }
  }

  handleRowClick (record, index) {
    const {userId, username, password, phoneNumber, email, nickname, name,
      employer, department, title, systemApplications} = record
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
    if (record.userId !== this.state.userId) {
      this.setState({
        userId,
        username,
        password,
        phoneNumber,
        email,
        nickname,
        name,
        employer,
        department,
        title,
        systemApplications
      })
      let selectedArr = []
      _.map(systemApplications, (appItem, index) => {
        if (appItem && appItem.groups) {
          _.map(appItem.groups, (groupItem, index1) => {
            if (groupItem && groupItem.roles) {
              _.map(groupItem.roles, (roleItem, index2) => {
                selectedArr.push(`${appItem.id}_${groupItem.id}_${roleItem.id}`)
              })
            }
          })
        }
      })
      this.setState({
        modifyCheckKeys: selectedArr
      })
    }
  }

  stopPopGation (e) {
    e.stopPropagation()
    e.cancelBubble = true
  }

  modifyPass (index, e) {
    this.stopPopGation(e)
    this.setState({
      showPassModal: true,
      changePassIndex: index
    })
  }

  banStartUser (index, e) {
    this.stopPopGation(e)
    const {userList, setShowLoading, modifyUserEnable} = this.props
    const {userId, enabled} = userList[index]
    setShowLoading(true)
    modifyUserEnable(userId, !enabled, this.state.currentPage - 1)
  }

  onDelete (index, e) {
    this.stopPopGation(e)
    const {userList, deleteUserById, setShowLoading} = this.props
    const {userId, username} = userList[index]
    setShowLoading(true)
    deleteUserById(userId, username)
    this.setState({
      currentPage: 1,
      selectedIndex: -1
    })
    // 如果删除的客户端是当前正在编辑的客户端
    if (userId === this.state.userId) {
      this.setState({
        btnModifyShow: false,
        btnCancelShow: false,
        btnSaveShow: false,
        showInfo: false,
        showUpdateInfo: false
      })
    }
  }

  handleRoleChange (value) {
    console.log(`selected ${value}`)
  }

  handlePassModalOk () {
    const {userList, modifyPass} = this.props
    const {changePass, changePassIndex} = this.state
    const {userId} = userList[changePassIndex]
    modifyPass(userId, changePass)
    this.setState({
      showPassModal: false,
      changePass: ''
    })
  }

  handlePassModalCancel () {
    this.setState({
      showPassModal: false,
      changePass: ''
    })
  }

  handleImportModalOk () {
    const {importDoctorFile, importPatientFile} = this.props
    const {importTypeValue} = this.state
    const files = this.fileInput.files
    const types = ['xls', 'xlsx', 'xlsm']
    if (files && files.length > 0) {
      const file = files[0]
      const fileName = file.name
      const ldot = fileName.lastIndexOf('.')
      const type = fileName.substring(ldot + 1)
      if (types.indexOf(type) > -1) {
        if (importTypeValue === 'doctor') {
          importDoctorFile(file)
        } else {
          importPatientFile(file)
        }
        this.setState({
          showImportModal: false,
          importLoadingShow: true,
          currentPage: 1
        })
      } else {
        message.error('文件类型错误！')
      }
    } else {
      message.error('请选择导入文件！')
    }
  }

  handleImportModalCancel () {
    this.setState({
      showImportModal: false
    })
  }

  handleModalOk () {
    const {addUser} = this.props
    const {usernameAdd, passwordAdd, phoneNumberAdd, emailAdd,
      nicknameAdd, nameAdd, employerAdd, passwordConfirmAdd, departmentAdd, titleAdd, groupRolesAdd} = this.state
    if (usernameAdd.trim() === '' || passwordAdd.trim() === '' || passwordConfirmAdd.trim() === '') {
      message.error('用户名和密码均不能为空！')
      return
    }
    if (passwordAdd !== passwordConfirmAdd) {
      message.error('密码和确认密码必须相同！')
      return
    }
    let groupArr = []
    _.map(groupRolesAdd, (item, index) => {
      if (item.split('_').length === 3) {
        groupArr.push({gId: item.split('_')[1], roleId: parseInt(item.split('_')[2])})
      }
    })
    addUser(usernameAdd, passwordAdd, phoneNumberAdd, emailAdd, nicknameAdd, nameAdd, employerAdd, departmentAdd, titleAdd, JSON.stringify(groupArr))
    this.setState({
      groupRolesAdd: [],
      usernameAdd: '',
      passwordAdd: '',
      phoneNumberAdd: '',
      emailAdd: '',
      nicknameAdd: '',
      nameAdd: '',
      employerAdd: '',
      departmentAdd: '',
      titleAdd: '',
      passwordConfirmAdd: '',
      modalVisible: false,
      selectedIndex: -1
    })
  }

  handleModalCancel () {
    this.setState({
      groupRolesAdd: [],
      modalVisible: false
    })
  }

  handleImportInfoModalOk () {
    const {resetImportStatus} = this.props
    this.setState({
      importInfoShow: false,
      importInfo: ''
    }, () => {
      resetImportStatus()
    })
  }

  handleImportInfoModalCancel () {
    const {resetImportStatus} = this.props
    this.setState({
      importInfoShow: false,
      importInfo: ''
    }, () => {
      resetImportStatus()
    })
  }

  addBtnClick () {
    this.setState({
      modalVisible: true
    })
  }

  importBtnClick () {
    console.log('导入用户')
    this.setState({
      showImportModal: true
    })
  }

  queryBtnClick () {
    const {setShowLoading, getUserByPage} = this.props
    const {queryUserName, queryPhoneNumber, queryUserId} = this.state
    setShowLoading(true)
    // if (queryUserName.trim() === '' && queryPhoneNumber.trim() === '' && queryUserId.trim() === '') {
    //   getUserByPage(0, queryUserId, queryUserName, queryPhoneNumber)
    //   return
    // }
    getUserByPage(0, queryUserId, queryUserName, queryPhoneNumber)
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
    const {username, phoneNumber, email, nickname, name,
      employer, department, title} = this.fakeState
    this.setState({
      username,
      phoneNumber,
      email,
      nickname,
      name,
      employer,
      department,
      title
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
    const {updateUser} = this.props
    const {userId, username, phoneNumber, email, nickname, name,
      employer, department, title, currentPage, modifyCheckKeys} = this.state
    this.setState({
      showInfo: true,
      showUpdateInfo: false,
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false
    })
    // 修改
    let groupArr = []
    _.map(modifyCheckKeys, (item, index) => {
      if (item.split('_').length === 3) {
        groupArr.push({gId: item.split('_')[1], roleId: parseInt(item.split('_')[2])})
      }
    })
    updateUser(currentPage, username, userId, phoneNumber, email, nickname, name, employer, department, title, JSON.stringify(groupArr))
  }

  onCheck (checkedKeys, info) {
    console.log('onCheck', checkedKeys)
    this.setState({
      groupRolesAdd: checkedKeys
    })
  }

  onModifyCheck (checkedKeys, info) {
    let mArr = []
    _.map(checkedKeys, (item, index) => {
      if (item.split('_').length === 3) {
        mArr.push(item)
      }
    })
    this.setState({
      modifyCheckKeys: mArr
    })
  }

  changeAddTxt (type, e) {
    const {value} = e.target
    switch (type) {
      case 'username':
        this.setState({
          usernameAdd: value
        })
        break
      case 'nickname':
        this.setState({
          nicknameAdd: value
        })
        break
      case 'name':
        this.setState({
          nameAdd: value
        })
        break
      case 'email':
        this.setState({
          emailAdd: value
        })
        break
      case 'password':
        this.setState({
          passwordAdd: value
        })
        break
      case 'passwordConfirm':
        this.setState({
          passwordConfirmAdd: value
        })
        break
      case 'phoneNumber':
        this.setState({
          phoneNumberAdd: value
        })
        break
      case 'employer':
        this.setState({
          employerAdd: value
        })
        break
      case 'department':
        this.setState({
          departmentAdd: value
        })
        break
      case 'title':
        this.setState({
          titleAdd: value
        })
        break
      default:
        break
    }
  }

  changeTxt (type, e) {
    const {value} = e.target
    switch (type) {
      case 'username':
        this.setState({
          username: value
        })
        break
      case 'nickname':
        this.setState({
          nickname: value
        })
        break
      case 'name':
        this.setState({
          name: value
        })
        break
      case 'email':
        this.setState({
          email: value
        })
        break
      case 'phoneNumber':
        this.setState({
          phoneNumber: value
        })
        break
      case 'employer':
        this.setState({
          employer: value
        })
        break
      case 'department':
        this.setState({
          department: value
        })
        break
      case 'title':
        this.setState({
          title: value
        })
        break
      case 'changePass':
        this.setState({
          changePass: value
        })
        break
      case 'queryUserName':
        this.setState({
          queryUserName: value
        })
        break
      case 'queryPhoneNumber':
        this.setState({
          queryPhoneNumber: value
        })
        break
      case 'queryUserId':
        this.setState({
          queryUserId: value
        })
        break
      default:
        break
    }
  }

  onPageChange (page) {
    const { getUserByPage, setShowLoading } = this.props
    const {queryUserId, queryUserName, queryPhoneNumber} = this.state
    setShowLoading(true)
    getUserByPage(page - 1, queryUserId, queryUserName, queryPhoneNumber)
    this.setState({
      currentPage: page,
      selectedIndex: -1
    })
  }

  checkImportTypeChange (e) {
    const value = e.target.value
    this.setState({
      importTypeValue: value
    })
  }
  fileUploadChange () {
    const files = this.fileInput.files
    const types = ['xls', 'xlsx', 'xlsm']
    if (files && files.length > 0) {
      let file = files[0]
      const fileName = file.name
      const ldot = fileName.lastIndexOf('.')
      const type = fileName.substring(ldot + 1)
      if (types.indexOf(type) > -1) {

      } else {
        message.error('文件类型错误！')
      }
    }
  }

  render () {
    const {modalVisible, showPassModal, showImportModal, changePass, username, phoneNumber, email, nickname, name, groupRolesAdd,
      employer, department, title, usernameAdd, passwordAdd, phoneNumberAdd, emailAdd, systemApplications, modifyCheckKeys,
      nicknameAdd, nameAdd, employerAdd, passwordConfirmAdd, departmentAdd, titleAdd, currentPage, queryUserName, queryUserId,
      queryPhoneNumber, selectedIndex, importTypeValue, importLoadingShow, importInfoShow, importInfo} = this.state
    const { userList, rolesList, userCount, loadingShow } = this.props
    return (
      <div>
        <div className={styles.wraper}>
          <Row className={styles.row}>
            <Col className={styles.title} span={2}>用户名：</Col>
            <Col className={styles.content} span={3}>
              <Input placeholder='用户名搜索' value={queryUserName} onChange={this.changeTxt.bind(this, 'queryUserName')} />
            </Col>
            <Col className={styles.title} span={2}>用户ID：</Col>
            <Col className={styles.content} span={3}>
              <Input placeholder='用户ID搜索' value={queryUserId} onChange={this.changeTxt.bind(this, 'queryUserId')} />
            </Col>
            <Col className={styles.title} span={2}>手机号：</Col>
            <Col className={styles.content} span={3}>
              <Input placeholder='手机号搜索' value={queryPhoneNumber} onChange={this.changeTxt.bind(this, 'queryPhoneNumber')} />
            </Col>
            <Col className={styles.title} offset={3} span={1}>
              <Button type='primary' onClick={this.queryBtnClick.bind(this)}>查询</Button>
            </Col>
            <Col className={styles.title} offset={1} span={1}>
              <Button onClick={this.addBtnClick.bind(this)} type='primary'>添加</Button>
            </Col>
            <Col className={styles.title} offset={1} span={1}>
              <Button onClick={this.importBtnClick.bind(this)} type='primary'>导入</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.tbCon}>
          {
            loadingShow ? <Spin className={styles.spin} size='large' /> : null
          }
          <Table onRowClick={this.handleRowClick.bind(this)} dataSource={userList} columns={this.columns}
            pagination={false} rowClassName={(record, index) => { return index === selectedIndex ? styles.selectedRow : '' }} />
        </div>
        <div className={styles.pageCon} style={{display: userCount > 0 ? 'block' : 'none'}}>
          <Row>
            <Col offset={12} span={12}>
              <Pagination current={currentPage} onChange={this.onPageChange.bind(this)} pageSize={5} total={userCount} />
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
            <Col className={styles.title} offset={2} span={3}>用户名：</Col>
            <Col className={styles.content} span={7}>{username || '暂未填写'}</Col>
            <Col className={styles.title} span={3}>真实姓名：</Col>
            <Col className={styles.content} span={3}>{name || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={2} span={3}>昵称：</Col>
            <Col className={styles.content} span={7}>{nickname || '暂未填写'}</Col>
            <Col className={styles.title} span={3}>单位：</Col>
            <Col className={styles.content} span={3}>{employer || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={2} span={3}>电话：</Col>
            <Col className={styles.content} span={7}>{phoneNumber || '暂未填写'}</Col>
            <Col className={styles.title} span={3}>部门科室：</Col>
            <Col className={styles.content} span={3}>{department || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={2} span={3}>邮箱：</Col>
            <Col className={styles.content} span={7}>{email || '暂未填写'}</Col>
            <Col className={styles.title} span={3}>职称：</Col>
            <Col className={styles.content} span={3}>{title || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={2} span={3}>角色：</Col>
            <Col className={styles.TreeCon} span={8} >
              <Tree
                defaultExpandAll
              >
                <TreeNode title='所在项目' key='00'>
                  {
                    _.map(systemApplications, (appItem, index) => {
                      return (
                        <TreeNode title={appItem.name} key={appItem.applicationCode}>
                          {
                          _.map(appItem.groups, (groupItem, index1) => {
                            return (
                              <TreeNode title={groupItem.groupName} key={`${appItem.id}_${groupItem.id}`}>
                                {
                                  _.map(groupItem.roles, (roleItem, index2) => {
                                    return (
                                      <TreeNode title={roleItem.roleName} key={`${appItem.id}_${groupItem.id}_${roleItem.id}`} />
                                    )
                                  })
                                }
                              </TreeNode>
                            )
                          })
                        }
                        </TreeNode>
                      )
                    })
                  }
                </TreeNode>
              </Tree>
            </Col>
          </Row>
        </div>
        <div className={styles.wraper} style={{display: this.state.showUpdateInfo ? 'block' : 'none'}}>
          <Row className={styles.row}>
            <Col className={styles.title} offset={3} span={3}>用户名：</Col>
            <Col className={styles.content} span={4}>
              <Input placeholder='请填写姓名' value={username} onChange={this.changeTxt.bind(this, 'username')} />
            </Col>
            <Col className={styles.title} span={3}>真实姓名：</Col>
            <Col className={styles.content} span={4}>
              <Input placeholder='请填写姓名' value={name} onChange={this.changeTxt.bind(this, 'name')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={3} span={3}>昵称：</Col>
            <Col className={styles.content} span={4}>
              <Input placeholder='请填写昵称' value={nickname} onChange={this.changeTxt.bind(this, 'nickname')} />
            </Col>
            <Col className={styles.title} span={3}>单位：</Col>
            <Col className={styles.content} span={4}>
              <Input placeholder='请填写单位名称' value={employer} onChange={this.changeTxt.bind(this, 'employer')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={3} span={3}>电话：</Col>
            <Col className={styles.content} span={4}>
              <Input placeholder='请填写电话' value={phoneNumber} onChange={this.changeTxt.bind(this, 'phoneNumber')} />
            </Col>
            <Col className={styles.title} span={3}>部门科室：</Col>
            <Col className={styles.content} span={4}>
              <Input placeholder='请填写部门科室' value={department} onChange={this.changeTxt.bind(this, 'department')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={3} span={3}>邮箱：</Col>
            <Col className={styles.content} span={4}>
              <Input placeholder='请填写邮箱' value={email} onChange={this.changeTxt.bind(this, 'email')} />
            </Col>
            <Col className={styles.title} span={3}>职称：</Col>
            <Col className={styles.content} span={4}>
              <Input placeholder='请填写职称' value={title} onChange={this.changeTxt.bind(this, 'title')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={3} span={3}>角色：</Col>
            <Col className={styles.TreeCon} span={8} >
              <Tree
                checkable
                defaultExpandAll
                checkedKeys={modifyCheckKeys}
                onCheck={this.onModifyCheck.bind(this)}
                >
                <TreeNode title='所有项目' key='00'>
                  {
                    _.map(rolesList, (appItem, index0) => {
                      return (
                        <TreeNode title={appItem.name} key={appItem.applicationCode}>
                          {
                          _.map(appItem.groups, (groupItem, index1) => {
                            return (
                              <TreeNode title={groupItem.groupName} key={`${appItem.id}_${groupItem.id}`}>
                                {
                                  _.map(groupItem.roles, (roleItem, index2) => {
                                    return (
                                      <TreeNode title={roleItem.roleName} key={`${appItem.id}_${groupItem.id}_${roleItem.id}`} />
                                    )
                                  })
                                }
                              </TreeNode>
                            )
                          })
                        }
                        </TreeNode>
                      )
                    })
                  }
                </TreeNode>
              </Tree>
            </Col>
          </Row>
        </div>
        <Modal title='添加用户' visible={modalVisible} okText='确定' cancelText='取消' width='960px'
          onOk={this.handleModalOk.bind(this)} onCancel={this.handleModalCancel.bind(this)}>
          <div className={styles.wraper}>
            <Row className={styles.row}>
              <Col className={styles.title} span={3}>* 用户名： </Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='必填' value={usernameAdd} onChange={this.changeAddTxt.bind(this, 'username')} />
              </Col>
              <Col className={styles.title} offset={2} span={3}>邮箱：</Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='请填写邮箱' value={emailAdd} onChange={this.changeAddTxt.bind(this, 'email')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={3}>* 密码：</Col>
              <Col className={styles.content} span={6}>
                <Input type='password' placeholder='必填' value={passwordAdd} onChange={this.changeAddTxt.bind(this, 'password')} />
              </Col>
              <Col className={styles.title} offset={2} span={3}>姓名： </Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='请填写姓名' value={nameAdd} onChange={this.changeAddTxt.bind(this, 'name')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={3}>* 确认密码：</Col>
              <Col className={styles.content} span={6}>
                <Input type='password' placeholder='必填，与密码相同' value={passwordConfirmAdd} onChange={this.changeAddTxt.bind(this, 'passwordConfirm')} />
              </Col>
              <Col className={styles.title} offset={2} span={3}>单位：</Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='请填写单位' value={employerAdd} onChange={this.changeAddTxt.bind(this, 'employer')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={3}>昵称：</Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='请填写昵称' value={nicknameAdd} onChange={this.changeAddTxt.bind(this, 'nickname')} />
              </Col>
              <Col className={styles.title} offset={2} span={3}>部门科室：</Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='请填写部门科室' value={departmentAdd} onChange={this.changeAddTxt.bind(this, 'department')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={3}>手机号：</Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='请填写手机号' value={phoneNumberAdd} onChange={this.changeAddTxt.bind(this, 'phoneNumber')} />
              </Col>
              <Col className={styles.title} offset={2} span={3}>职称：</Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='请填写职称' value={titleAdd} onChange={this.changeAddTxt.bind(this, 'title')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={3}>角色：</Col>
              <Col className={styles.TreeCon} span={8} >
                <Tree
                  checkable
                  checkedKeys={groupRolesAdd}
                  onCheck={this.onCheck.bind(this)}
                >
                  <TreeNode title='所有项目' key='00'>
                    {
                    _.map(rolesList, (appItem, index0) => {
                      return (
                        <TreeNode title={appItem.name} key={appItem.applicationCode}>
                          {
                          _.map(appItem.groups, (groupItem, index1) => {
                            return (
                              <TreeNode title={groupItem.groupName} key={`${appItem.id}_${groupItem.id}`}>
                                {
                                  _.map(groupItem.roles, (roleItem, index2) => {
                                    return (
                                      <TreeNode title={roleItem.roleName} key={`${appItem.id}_${groupItem.id}_${roleItem.id}`} />
                                    )
                                  })
                                }
                              </TreeNode>
                            )
                          })
                        }
                        </TreeNode>
                      )
                    })
                  }
                  </TreeNode>
                </Tree>
              </Col>
            </Row>
          </div>
        </Modal>
        <Modal title='修改密码' visible={showPassModal} okText='确定' cancelText='取消'
          onOk={this.handlePassModalOk.bind(this)} onCancel={this.handlePassModalCancel.bind(this)}>
          <div className={styles.wraper}>
            <Row className={styles.row}>
              <Col className={styles.title} offset={2} span={6}>新密码：</Col>
              <Col className={styles.content} span={12}>
                <Input placeholder='请填写新密码' type='password' value={changePass} onChange={this.changeTxt.bind(this, 'changePass')} />
              </Col>
            </Row>
          </div>
        </Modal>
        <Modal title='导入用户' visible={showImportModal} okText='确定' cancelText='取消'
          onOk={this.handleImportModalOk.bind(this)} onCancel={this.handleImportModalCancel.bind(this)}>
          <div className={styles.wraper}>
            <Row className={styles.row}>
              <Col className={styles.title} offset={1} span={6}>* 用户类型：</Col>
              <Col className={styles.content} offset={1} span={12}>
                <RadioGroup options={this.importType} value={importTypeValue} onChange={this.checkImportTypeChange.bind(this)} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} offset={1} span={6}>* 导入文件：</Col>
              <Col className={styles.content} offset={1} span={12}>
                <input type='file' ref={input => {
                  this.fileInput = input
                }} onChange={this.fileUploadChange.bind(this)} />
              </Col>
            </Row>
          </div>
        </Modal>
        <Modal title='导入用户' visible={importInfoShow} okText='确定' cancelText='关闭'
          onOk={this.handleImportInfoModalOk.bind(this)} onCancel={this.handleImportInfoModalCancel.bind(this)}>
          <div className={styles.wraper}>
            {
              _.map(importInfo.split('!'), (item, index) => {
                return (
                  <div>{item}</div>
                )
              })
            }
          </div>
        </Modal>
        <div className={styles.spinCon} style={{display: importLoadingShow ? 'block' : 'none'}}>
          <Spin className={styles.spin} tip='上传中...' />
        </div>
      </div>
    )
  }
}
