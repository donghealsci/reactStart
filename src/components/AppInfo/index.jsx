import React from 'react'
import * as styles from './appInfo.scss'
import BtnGroups from 'components/BtnGroups'
import { Table, Popconfirm, Row, Col, Input, Checkbox,
  message, Spin, Pagination, Select, Button, Modal, Radio } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import UploadBar from 'components/UploadBar'
const Option = Select.Option
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const {AUTH_HOST} = globalConfig.default

export default class AppInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      content: '',
      contentUpdate: '',
      title: '',
      titleUpdate: '',
      imgList: [],
      imgListUpdate: [],
      imgFile: null,
      imgFileUpdate: null,
      currentPage: 1,
      selectedIndex: -1,
      fileChanged: false,
      btnSaveShow: true,
      appCheckedItems: [],
      appCheckedItemsUpdate: [],
      selectedPro: 'all',
      selectedStatus: 'all',
      modalVisible: false,
      deployName: true,
      deployNameUpdate: false,
      id: '',
      showedAppInfo: '',
      showUpdateInfo: false
    }
    this.deployStatus = [{label: '待发布', value: false}, {label: '发布', value: true}]
    this.columns = [{
      title: '标题',
      dataIndex: 'head',
      minWidth: 100,
      key: 'head',
      width: '35%'
    }, {
      title: '缩略图',
      dataIndex: 'iconPath',
      key: 'iconPath',
      render: (text, record, index) => {
        return (
          record.iconPath ? <img src={record.iconPath} style={{width: 'auto', height: '60px', display: 'inline-block'}} /> : <span>缩略图尚未上传</span>
        )
      },
      width: '20%'
    }, {
      title: '资讯预览',
      dataIndex: 'linkPage',
      key: 'linkPage',
      render: (text, record, index) => {
        return (
          <a href={text} target='_blank'>点击预览</a>
        )
      },
      width: '20%'
    }, {
      title: '操作',
      dataIndex: '操作',
      render: (text, record, index) => {
        return (
          <span>
            <Popconfirm title='确定上移该信息？' okText='确定' cancelText='取消' onClick={(e) => { this.stopPopGation(e) }} onCancel={(e) => { this.stopPopGation(e) }} onConfirm={(e) => this.upAndDownNews(record, true, e)}>
              <a href='#'>&nbsp;上移&nbsp;&nbsp;</a>
            </Popconfirm>
            <Popconfirm title='确定下移该信息？' okText='确定' cancelText='取消' onClick={(e) => { this.stopPopGation(e) }} onCancel={(e) => { this.stopPopGation(e) }} onConfirm={(e) => this.upAndDownNews(record, false, e)}>
              <a href='#'>&nbsp;&nbsp;下移&nbsp;&nbsp;</a>
            </Popconfirm>
            {
              record.status === 2 ? <span>&nbsp;&nbsp;资讯已下线&nbsp;&nbsp;</span> : <Popconfirm title='确定下线该资讯？' okText='确定' cancelText='取消' onClick={(e) => { this.stopPopGation(e) }} onCancel={(e) => { this.stopPopGation(e) }} onConfirm={(e) => this.onDelete(index, e)}>
                <a href='#'>&nbsp;&nbsp;下线资讯&nbsp;</a>
              </Popconfirm>
            }
          </span>
        )
      },
      width: '25%',
      textAlign: 'center'
    }]
  }

  componentWillMount () {
    const {setBreadCrumb, getNewsPagesByPage, getAllAppClients} = this.props
    let { selectedPro, selectedStatus } = this.state
    if (selectedPro === 'all') {
      selectedPro = ''
    }
    setBreadCrumb('App资讯', 'App资讯')
    getNewsPagesByPage(0, selectedStatus, selectedPro)
    getAllAppClients()
  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {
    const {showedAppInfo} = nextProps
    if (this.state.showedAppInfo !== showedAppInfo) {
      this.setState({
        showedAppInfo,
        contentUpdate: showedAppInfo
      })
      this.editorInstanceUpdate.setContent(showedAppInfo, '')
    }
  }

  stopPopGation (e) {
    e.stopPropagation()
    e.cancelBubble = true
  }

  upAndDownNews (record, isUp, e) {
    const {upAndDownNewsById} = this.props
    const {currentPage} = this.state
    this.stopPopGation(e)
    upAndDownNewsById(record.id, isUp, currentPage)
  }

  onDelete (index, e) {
    let {selectedPro, selectedStatus} = this.state
    this.stopPopGation(e)
    const {newsPagesList, setNewsPagesShowLoading, deleteNewsPageById} = this.props
    const {id, head} = newsPagesList[index]
    setNewsPagesShowLoading(true)
    selectedPro = selectedPro === 'all' ? '' : selectedPro
    deleteNewsPageById(id, head, selectedStatus, selectedPro)
    this.setState({
      currentPage: 1
    })
  }

  handleChange (content) {
    this.setState({content})
  }

  handleChangeUpdate (content) {
    this.setState({
      contentUpdate: content
    })
  }

  changeTxt (type, addOrUp, e) {
    const {value} = e.target
    switch (type) {
      case 'title':
        if (addOrUp === 'add') {
          this.setState({
            title: value
          })
        } else {
          this.setState({
            titleUpdate: value
          })
        }
        break
      default:
        break
    }
  }

  fileChange (type, imgList, imgFile) {
    console.log(type)
    if (type === 'add') {
      this.setState({
        imgList,
        imgFile
      })
    } else {
      this.setState({
        imgListUpdate: imgList,
        imgFileUpdate: imgFile,
        fileChanged: true
      })
    }
  }

  clearImg (type) {
    if (type === 'add') {
      this.setState({
        imgList: [],
        imgFile: null
      })
    } else {
      // this.uploadBar2.clearImgValue()
      this.setState({
        imgListUpdate: [],
        imgFileUpdate: null,
        fileChanged: true
      })
    }
  }

  onPageChange (page) {
    const {getNewsPagesByPage, setNewsPagesShowLoading} = this.props
    const {selectedStatus, selectedPro} = this.state
    const pro = selectedPro === 'all' ? '' : selectedPro
    setNewsPagesShowLoading(true)
    // getNewsPagesByPage(page - 1)
    getNewsPagesByPage(page - 1, selectedStatus, pro)
    this.setState({
      currentPage: page,
      selectedIndex: -1,
      showUpdateInfo: false
    })
  }
  uploadFn (param) {
    const serverURL = `${AUTH_HOST}/setup/api/web/images`
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: JSON.parse(xhr.responseText).data
      })
    }
    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }
    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }
    xhr.upload.addEventListener('progress', progressFn, false)
    xhr.addEventListener('load', successFn, false)
    xhr.addEventListener('error', errorFn, false)
    xhr.addEventListener('abort', errorFn, false)
    fd.append('image', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  }

  checkboxChange (type, checkedValues) {
    if (type === 'add') {
      this.setState({
        appCheckedItems: checkedValues
      })
    } else {
      this.setState({
        appCheckedItemsUpdate: checkedValues
      })
    }
  }

  selectChange (value) {
    const {getNewsPagesByPage} = this.props
    const {selectedStatus} = this.state
    this.setState({
      selectedPro: value,
      currentPage: 1,
      selectedIndex: -1
    })
    const pro = value === 'all' ? '' : value
    getNewsPagesByPage(0, selectedStatus, pro)
  }

  statusSelectChange (value) {
    const {getNewsPagesByPage} = this.props
    const {selectedPro} = this.state
    this.setState({
      selectedStatus: value,
      currentPage: 1,
      selectedIndex: -1
    })
    const pro = selectedPro === 'all' ? '' : selectedPro
    getNewsPagesByPage(0, value, pro)
  }

  handleModalOk () {
    const {addNewsPages} = this.props
    const {title, imgFile, content, appCheckedItems, deployName} = this.state
    let arr = []
    for (let i = 0; i < appCheckedItems.length; i++) {
      arr.push(appCheckedItems[i])
    }
    if (title === '' || imgFile === null || content === '' || arr.length === 0) {
      message.error('请把必填项填写完整')
      return
    }
    addNewsPages(title, imgFile, content, arr, deployName)
    this.uploadBar1.clearImgValue()
    this.editorInstance.setContent('', 'html')
    this.setState({
      title: '',
      appCheckedItems: [],
      content: '',
      imgFile: null,
      imgList: [],
      modalVisible: false,
      fileChanged: false,
      selectedIndex: -1,
      showUpdateInfo: false
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

  checkDeployChange (type, e) {
    const value = e.target.value
    if (type === 'add') {
      this.setState({
        deployName: value
      })
    } else {
      this.setState({
        deployNameUpdate: value
      })
    }
  }

  handleRowClick (record, index) {
    const {id, head, iconPath, clients, status} = record
    if (parseInt(status) === 2) {
      message.warn('无法修改已下线的资讯')
      return
    }
    const {getAppContentById} = this.props
    const imgUpdateArr = iconPath ? [iconPath] : []
    if (id && this.state.id !== id) {
      getAppContentById(id)
      this.setState({
        id,
        titleUpdate: head,
        imgListUpdate: imgUpdateArr,
        imgFileUpdate: null,
        appCheckedItemsUpdate: clients,
        deployNameUpdate: Boolean(status),
        fileChanged: false,
        showUpdateInfo: true,
        selectedIndex: index

      })
    }
  }

  updateInfo () {
    const {currentPage, id, titleUpdate, imgFileUpdate, contentUpdate, appCheckedItemsUpdate, deployNameUpdate, fileChanged} = this.state
    const {updateNewsPages} = this.props
    if (titleUpdate === '' || contentUpdate === '' || appCheckedItemsUpdate.length === 0) {
      message.error('请把必填项填写完整')
      return
    }
    if (imgFileUpdate === null && fileChanged) {
      message.error('请上传logo图片')
      return
    }
    updateNewsPages(currentPage, id, titleUpdate, imgFileUpdate, contentUpdate, appCheckedItemsUpdate, deployNameUpdate)
    this.setState({
      imgFileUpdate: null,
      fileChanged: false
    })
  }

  render () {
    const {title, imgList, selectedIndex, currentPage, appCheckedItems, modalVisible, deployName} = this.state
    const {titleUpdate, imgListUpdate, appCheckedItemsUpdate, deployNameUpdate, showUpdateInfo} = this.state
    const {newsPagesLoadingShow, newsPagesList, newsPagesCount, appClients} = this.props
    const editorProps = {
      height: 537,
      image: true,
      contentFormat: 'html',
      initialContent: '<p>请填写内容</p>',
      onChange: this.handleChange.bind(this),
      media: {
        allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
        image: true, // 开启图片插入功能
        video: true, // 开启视频插入功能
        audio: true, // 开启音频插入功能
        validateFn: null, // 指定本地校验函数，说明见下文
        uploadFn: this.uploadFn.bind(this)
      }
    }
    const editorPropsUpdate = {
      height: 537,
      image: true,
      contentFormat: 'html',
      initialContent: '<p>请填写内容</p>',
      onChange: this.handleChangeUpdate.bind(this),
      media: {
        allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
        image: true, // 开启图片插入功能
        video: true, // 开启视频插入功能
        audio: true, // 开启音频插入功能
        validateFn: null, // 指定本地校验函数，说明见下文
        uploadFn: this.uploadFn.bind(this)
      }
    }
    return (
      <div>
        <div className={styles.wraper}>
          <Row className={styles.row}>
            <Col className={styles.titleAdd} span={2}>客户端名称：</Col>
            <Col className={styles.content} span={5}>
              <Select defaultValue='all' style={{width: '200px'}} onChange={this.selectChange.bind(this)}>
                <Option value='all'>所有客户端</Option>
                {
                  _.map(appClients, (item, index) => {
                    return (
                      <Option key={index} value={item.value}>{item.label}</Option>
                    )
                  })
                }
              </Select>
            </Col>
            <Col className={styles.titleAdd} span={2}>上线状态：</Col>
            <Col className={styles.content} span={5}>
              <Select defaultValue='all' style={{width: '200px'}} onChange={this.statusSelectChange.bind(this)}>
                <Option value='all'>所有状态</Option>
                <Option value='0'>待上线</Option>
                <Option value='1'>已上线</Option>
                <Option value='2'>已下线</Option>
              </Select>
            </Col>
            <Col className={styles.titleAdd} offset={7} span={1}>
              <Button onClick={this.addBtnClick.bind(this)} type='primary'>添加</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.tbCon}>
          {
            newsPagesLoadingShow ? <Spin className={styles.spin} size='large' /> : null
          }
          <Table onRowClick={this.handleRowClick.bind(this)} dataSource={newsPagesList} columns={this.columns}
            pagination={false} rowClassName={(record, index) => { return index === selectedIndex ? styles.selectedRow : '' }} />
          <div className={styles.pageCon} style={{display: newsPagesCount > 0 ? 'block' : 'none'}}>
            <Row>
              <Col offset={12} span={12}>
                <Pagination current={currentPage} onChange={this.onPageChange.bind(this)} pageSize={5} total={newsPagesCount} />
              </Col>
            </Row>
          </div>
        </div>
        <Modal title='添加资讯' visible={modalVisible} okText='确定' cancelText='取消' width='960px'
          onOk={this.handleModalOk.bind(this)} onCancel={this.handleModalCancel.bind(this)}>
          <div className={styles.wraper}>
            <div className={styles.editor}>
              <Row className={styles.row}>
                <Col className={styles.title} span={3}>* 标题：</Col>
                <Col className={styles.content} span={16}>
                  <Input placeholder='请填写标题' value={title} onChange={this.changeTxt.bind(this, 'title', 'add')} />
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col className={styles.title} span={3}>* 客户端名称：</Col>
                <Col className={styles.content} span={10}>
                  <CheckboxGroup options={appClients} value={appCheckedItems} onChange={this.checkboxChange.bind(this, 'add')} />
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col className={styles.title} span={3}>* 缩略图：</Col>
                <Col className={styles.content} span={5}>
                  <UploadBar ref={bar => {
                    this.uploadBar1 = bar
                  }} fileChange={this.fileChange.bind(this, 'add')} clearImg={this.clearImg.bind(this, 'add')}
                    imgList={imgList} />
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col className={styles.title} span={3}>* 发布状态：</Col>
                <Col className={styles.content} span={10}>
                  <RadioGroup options={this.deployStatus} value={deployName} onChange={this.checkDeployChange.bind(this, 'add')} />
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col className={styles.title} span={3}>* 资讯内容：</Col>
                <Col className={styles.content} span={16}>
                  <div className={styles.ofh}>
                    <div className={`${styles.editorCon} ${styles.fl}`}>
                      <BraftEditor ref={instance => this.editorInstance = instance} {...editorProps} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Modal>
        <div className={styles.wraper} style={{'display': showUpdateInfo ? 'block' : 'none'}}>
          <Row className={styles.row}>
            <Col className={styles.titleAdd} offset={11} span={2}>
              <Button onClick={() => { this.updateInfo() }} type='primary'>更新</Button>
            </Col>
          </Row>
          <div className={styles.wraper}>
            <div className={styles.editor}>
              <Row className={styles.row}>
                <Col className={styles.title} span={3}>* 标题：</Col>
                <Col className={styles.content} span={16}>
                  <Input placeholder='请填写标题' value={titleUpdate} onChange={this.changeTxt.bind(this, 'title', 'update')} />
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col className={styles.title} span={3}>* 客户端名称：</Col>
                <Col className={styles.content} span={10}>
                  <CheckboxGroup options={appClients} value={appCheckedItemsUpdate} onChange={this.checkboxChange.bind(this, 'update')} />
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col className={styles.title} span={3}>* 缩略图：</Col>
                <Col className={styles.content} span={5}>
                  <UploadBar ref={bar => {
                    this.uploadBar2 = bar
                  }} fileChange={this.fileChange.bind(this, 'update')} clearImg={this.clearImg.bind(this, 'update')}
                    imgList={imgListUpdate} />
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col className={styles.title} span={3}>* 发布状态：</Col>
                <Col className={styles.content} span={10}>
                  <RadioGroup options={this.deployStatus} value={deployNameUpdate} onChange={this.checkDeployChange.bind(this, 'update')} />
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col className={styles.title} span={3}>* 资讯内容：</Col>
                <Col className={styles.content} span={16}>
                  <div className={styles.ofh}>
                    <div className={`${styles.editorCon} ${styles.fl}`}>
                      <BraftEditor ref={instance => this.editorInstanceUpdate = instance} {...editorPropsUpdate} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
