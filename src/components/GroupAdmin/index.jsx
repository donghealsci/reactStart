import React from 'react'
import * as styles from './groupAdmin.scss'
import BtnGroups from 'components/BtnGroups'
import UploadBar from 'components/UploadBar'
import { Table, Popconfirm, Button, Row, Col, Input, Checkbox, Pagination,
  Select, Modal, message, Spin, Tag } from 'antd'
const Option = Select.Option
const CheckboxGroup = Checkbox.Group

export default class GroupAdmin extends React.Component {
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
      imgList: [],
      imgFile: null,
      imgUpdateList: [],
      imgUpdateFile: null,
      selectedIndex: -1,
      currentPage: 1,
      id: '',
      groupId: '',
      groupName: '',
      alias: '',
      identifier: '',
      image: '',
      systemApplications: [],
      groupIdAdd: '',
      groupNameAdd: '',
      aliasAdd: '',
      identifierAdd: '',
      imageAdd: '',
      systemApplicationsAdd: [],
      appCheckedItems: [],
      appCheckedUpdateItems: [],
      fileChanged: false
    }
    this.fakeState = null
    this.columns = [{
      title: '组名称',
      dataIndex: 'groupName',
      key: 'groupName'
    }, {
      title: '组编号',
      dataIndex: 'groupId',
      key: 'groupId'
    }, {
      title: '组简称',
      dataIndex: 'alias',
      key: 'alias'
    }, {
      title: '唯一标识',
      dataIndex: 'identifier',
      key: 'identifier'
    },
    {
      title: '项目名称',
      dataIndex: '项目名称',
      render: (text, record, index) => {
        return (
          _.map(record.systemApplications, (item, index) => {
            return (
              item && item.name ? <span key={index}>{item.name}<br /></span> : null
            )
          })
        )
      }
    },
    {
      title: '删除',
      dataIndex: '删除',
      render: (text, record, index) => {
        return (
          <Popconfirm title='确定删除该组？' okText='确定' cancelText='取消' onClick={(e) => { this.stopPopGation(e) }} onCancel={(e) => { this.stopPopGation(e) }} onConfirm={(e) => this.onDelete(index, e)}>
            <a href='#'>删除</a>
          </Popconfirm>
        )
      }
    }]
  }

  componentWillMount () {
    const {setBreadCrumb, getGroupByPage, getAllAppRoles} = this.props
    setBreadCrumb('组管理', '组管理')
    getGroupByPage(0)
    getAllAppRoles()
  }

  handleRowClick (record, index) {
    const {id, groupId, groupName, alias, identifier, image, systemApplications} = record
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
    if (record.id !== this.state.id) {
      const imgUpdateArr = record.image ? [record.image] : []
      const initalApps = _.map(systemApplications, (item, index) => {
        return item.applicationCode
      })
      this.setState({
        id,
        groupId,
        groupName,
        alias,
        identifier,
        image,
        systemApplications,
        imgUpdateList: imgUpdateArr,
        appCheckedUpdateItems: initalApps,
        fileChanged: false
      })
    }
  }

  stopPopGation (e) {
    e.stopPropagation()
    e.cancelBubble = true
  }

  onDelete (index, e) {
    this.stopPopGation(e)
    const {groupList, deleteGroupById, setGroupShowLoading} = this.props
    const {id, groupName} = groupList[index]
    setGroupShowLoading(true)
    deleteGroupById(id, groupName)
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
    const {addGroup} = this.props
    const {groupIdAdd, groupNameAdd, aliasAdd, identifierAdd, imgFile, appCheckedItems} = this.state
    if (!groupNameAdd) {
      message.error('组名称不能为空')
      return
    }
    if (!groupIdAdd) {
      message.error('组编号不能为空')
      return
    }
    if (appCheckedItems.length === 0) {
      message.error('所属项目至少选一项！')
      return
    }
    const checkedApps = _.map(appCheckedItems, (item, index) => {
      return {
        'applicationCode': item
      }
    })
    addGroup(groupIdAdd, groupNameAdd, aliasAdd, identifierAdd, JSON.stringify(checkedApps), imgFile)
    this.uploadBar1.clearImgValue()
    this.setState({
      modalVisible: false,
      groupIdAdd: '',
      groupNameAdd: '',
      aliasAdd: '',
      identifierAdd: '',
      appCheckedItems: [],
      imgList: [],
      imgFile: null,
      selectedIndex: -1,
      filechanged: false
    })
  }

  handleModalCancel () {
    this.uploadBar1.clearImgValue()
    this.setState({
      modalVisible: false,
      groupIdAdd: '',
      groupNameAdd: '',
      aliasAdd: '',
      identifierAdd: '',
      appCheckedItems: [],
      imgList: [],
      imgFile: null
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
      case 'groupName':
        this.setState({
          groupName: value
        })
        break
      case 'groupId':
        this.setState({
          groupId: value
        })
        break
      case 'alias':
        this.setState({
          alias: value
        })
        break
      case 'identifier':
        this.setState({
          identifier: value
        })
        break
      default:
        break
    }
  }

  changeAddTxt (type, e) {
    const {value} = e.target
    switch (type) {
      case 'groupName':
        this.setState({
          groupNameAdd: value
        })
        break
      case 'groupId':
        this.setState({
          groupIdAdd: value
        })
        break
      case 'alias':
        this.setState({
          aliasAdd: value
        })
        break
      case 'identifier':
        this.setState({
          identifierAdd: value
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
    this.setState({
      showInfo: true,
      showUpdateInfo: false,
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false
    })
    const {groupName, groupId, alias, identifier, imgUpdateList, imgUpdateFile} = this.fakeState
    this.setState({
      groupName,
      groupId,
      alias,
      identifier,
      imgUpdateList,
      imgUpdateFile,
      fileChanged: false
    })
  }

  saveBtnClick () {
    const {updateGroup} = this.props
    const {fileChanged} = this.state
    const {id, currentPage, groupId, groupName, alias, identifier, imgUpdateFile, appCheckedUpdateItems} = this.state
    if (!groupName) {
      message.error('组名称不能为空')
      return
    }
    if (!groupId) {
      message.error('组编号不能为空')
      return
    }
    if (appCheckedUpdateItems.length === 0) {
      message.error('所属项目至少选一项！')
      return
    }
    const checkedApps = _.map(appCheckedUpdateItems, (item, index) => {
      return {
        'applicationCode': item
      }
    })
    updateGroup(currentPage, fileChanged, id, groupId, groupName, alias, identifier, JSON.stringify(checkedApps), imgUpdateFile)
    this.setState({
      showInfo: true,
      showUpdateInfo: false,
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false,
      fileChanged: false
    })
  }

  onPageChange (page) {
    const {getGroupByPage, setGroupShowLoading} = this.props
    const { selectedAppCode } = this.state
    const queryCode = selectedAppCode === 'all' ? '' : selectedAppCode
    setGroupShowLoading(true)
    getGroupByPage(page - 1, queryCode)
    this.setState({
      currentPage: page,
      selectedIndex: -1,
      fileChanged: false
    })
  }

  fileChange (imgList, imgFile) {
    this.setState({
      imgList,
      imgFile
    })
  }

  fileUpdateChange (imgUpdateList, imgUpdateFile) {
    this.setState({
      fileChanged: true,
      imgUpdateList,
      imgUpdateFile
    })
  }

  clearImg () {
    this.setState({
      imgList: [],
      imgFile: null
    })
  }

  clearUpdateImg () {
    this.setState({
      imgUpdateList: [],
      imgUpdateFile: null,
      fileChanged: true,
      image: ''
    })
  }

  checkboxChange (checkedValues) {
    this.setState({
      appCheckedItems: checkedValues
    })
  }

  checkboxModifyChange (checkedValues) {
    this.setState({
      appCheckedUpdateItems: checkedValues
    })
  }

  selectChange (value) {
    const { getGroupByPage, setGroupShowLoading } = this.props
    const queryCode = value === 'all' ? '' : value
    setGroupShowLoading(true)
    getGroupByPage(0, queryCode)
    this.setState({
      selectedAppCode: value,
      currentPage: 1,
      selectedIndex: -1
    })
  }

  render () {
    const { modalVisible, selectedIndex, currentPage, groupId, groupName, alias, identifier, systemApplications,
      groupIdAdd, groupNameAdd, aliasAdd, identifierAdd, imgList, imgUpdateList, appCheckedUpdateItems,
      appCheckedItems } = this.state
    const {groupLoadingShow, groupList, groupCount, appList} = this.props
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
            <Col className={styles.title} offset={13} span={1}>
              <Button onClick={this.addBtnClick.bind(this)} type='primary'>添加</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.tbCon}>
          {
            groupLoadingShow ? <Spin className={styles.spin} size='large' /> : null
          }
          <Table onRowClick={this.handleRowClick.bind(this)} dataSource={groupList} columns={this.columns}
            pagination={false} rowClassName={(record, index) => { return index === selectedIndex ? styles.selectedRow : '' }} />
        </div>
        <div className={styles.pageCon} style={{display: groupCount > 0 ? 'block' : 'none'}}>
          <Row>
            <Col offset={12} span={12}>
              <Pagination current={currentPage} onChange={this.onPageChange.bind(this)} pageSize={5} total={groupCount} />
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
            <Col className={styles.title} offset={2} span={3}>组名称：</Col>
            <Col className={styles.content} span={7}>{groupName || '暂未填写'}</Col>
            <Col className={styles.title} span={3}>简称：</Col>
            <Col className={styles.content} span={7}>{alias || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={2} span={3}>组编号：</Col>
            <Col className={styles.content} span={7}>{groupId || '暂未填写'}</Col>
            <Col className={styles.title} span={3}>唯一标识：</Col>
            <Col className={styles.content} span={7}>{identifier || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={2} span={3}>logo图片：</Col>
            <Col className={styles.content} span={7}>
              {
                imgUpdateList && imgUpdateList[0] ? <img className={styles.showImg} src={imgUpdateList[0]} /> : '还未上传logo'
              }
            </Col>
            <Col className={styles.title} span={3}>所属项目：</Col>
            <Col className={styles.content} span={7}>
              {
                systemApplications.length > 0 ? _.map(systemApplications, (item, index) => {
                  return (
                    <Tag key={index}>{item.name}</Tag>
                  )
                }) : '暂无'
              }
            </Col>
          </Row>
        </div>
        <div className={styles.wraper} style={{display: this.state.showUpdateInfo ? 'block' : 'none'}}>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>* 组名称：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写组名称' value={groupName} onChange={this.changeTxt.bind(this, 'groupName')} />
            </Col>
            <Col className={styles.title} span={5}>简称：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写组简称' value={alias} onChange={this.changeTxt.bind(this, 'alias')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>* 组编号：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写组编号' value={groupId} onChange={this.changeTxt.bind(this, 'groupId')} />
            </Col>
            <Col className={styles.title} span={5}>唯一标识：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写唯一标识' value={identifier} onChange={this.changeTxt.bind(this, 'identifier')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>logo图片：</Col>
            <Col className={styles.content} span={5}>
              <UploadBar ref={bar => {
                this.uploadBar2 = bar
              }} fileChange={this.fileUpdateChange.bind(this)} clearImg={this.clearUpdateImg.bind(this)}
                imgList={imgUpdateList} />
            </Col>
            <Col className={styles.title} span={5}>* 所属项目：</Col>
            <Col className={styles.content} span={5}>
              <CheckboxGroup options={appList} value={appCheckedUpdateItems} onChange={this.checkboxModifyChange.bind(this)} />
            </Col>
          </Row>
        </div>
        <Modal title='添加组' visible={modalVisible} okText='确定' cancelText='取消' width='960px'
          onOk={this.handleModalOk.bind(this)} onCancel={this.handleModalCancel.bind(this)}>
          <div className={styles.wraper}>
            <Row className={styles.row}>
              <Col className={styles.title} span={5}>* 组名称： </Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='必填' value={groupNameAdd} onChange={this.changeAddTxt.bind(this, 'groupName')} />
              </Col>
              <Col className={styles.title} span={5}>简称：</Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='请填写简称' value={aliasAdd} onChange={this.changeAddTxt.bind(this, 'alias')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={5}>* 组编号： </Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='必填' value={groupIdAdd} onChange={this.changeAddTxt.bind(this, 'groupId')} />
              </Col>
              <Col className={styles.title} span={5}>唯一标识：</Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='请填写唯一标识' value={identifierAdd} onChange={this.changeAddTxt.bind(this, 'identifier')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={5}>logo图片： </Col>
              <Col className={styles.content} span={6}>
                <UploadBar ref={bar => {
                  this.uploadBar1 = bar
                }} fileChange={this.fileChange.bind(this)} clearImg={this.clearImg.bind(this)}
                  imgList={imgList} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={5}>* 所属项目： </Col>
              <Col className={styles.content} span={18}>
                <CheckboxGroup options={appList} value={appCheckedItems} onChange={this.checkboxChange.bind(this)} />
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    )
  }
}
