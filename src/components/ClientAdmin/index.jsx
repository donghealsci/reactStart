import React from 'react'
import * as styles from './clientAdmin.scss'
import BtnGroups from 'components/BtnGroups'
import EditableInput from 'components/EditableInput'
import { Table, Spin, Popconfirm, Button, Pagination, Row, Col, Input, Tag, Modal, message } from 'antd'

export default class ClientAdmin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: -1,
      btnModifyShow: false,
      btnCancelShow: false,
      btnSaveShow: false,
      currentPage: 1,
      showInfo: false,
      showUpdateInfo: false,
      id: '',
      clientName: '',
      clientId: '',
      clientSecret: '',
      apiScopeName: '',
      idTokenValiditySeconds: '',
      accessTokenValiditySeconds: '',
      refreshTokenValiditySeconds: '',
      clientRedirectUris: [],
      clientPostLogoutRedirectUris: [],
      queryClientId: '',
      modalVisible: false,
      clientIdAdd: '',
      clientNameAdd: '',
      clientSecretAdd: '',
      apiScopeNameAdd: '',
      idTokenValiditySecondsAdd: '600',
      accessTokenValiditySecondsAdd: '3600',
      refreshTokenValiditySecondsAdd: '2592000',
      clientPostLogoutRedirectUrisAdd: [{postLogoutRedirectUri: ''}],
      clientRedirectUrisAdd: [{redirectUri: ''}]
    }
    this.fakeState = null
    this.columns = [{
      title: '客户端ID',
      dataIndex: 'clientId',
      key: 'clientId'
    }, {
      title: '名称',
      dataIndex: 'clientName',
      key: 'clientName'
    }, {
      title: 'API标识',
      dataIndex: 'apiScopeName',
      key: 'apiScopeName'
    }, {
      title: 'accessToken有效期（秒）',
      dataIndex: 'accessTokenValiditySeconds',
      key: 'accessTokenValiditySeconds'
    }, {
      title: '登录重定向地址',
      dataIndex: '登录重定向地址',
      render: (text, record, index) => {
        return (
          _.map(record.clientRedirectUris, (item, index) => {
            return (
              <span key={index}>{item.redirectUri}<br /></span>
            )
          })
        )
      }
    }, {
      title: '操作',
      dataIndex: '操作',
      render: (text, record, index) => {
        return (
          <span>
            <Popconfirm title='确定删除该用户？' okText='确定' cancelText='取消' onClick={(e) => { this.stopPopGation(e) }} onCancel={(e) => { this.stopPopGation(e) }} onConfirm={(e) => this.onDelete(index, e)}>
              <a href='#'>删除</a>
            </Popconfirm>
          </span>
        )
      }
    }]
  }

  handleRowClick (record, index) {
    const {clientName, clientId, apiScopeName, idTokenValiditySeconds, accessTokenValiditySeconds,
        refreshTokenValiditySeconds, id, clientRedirectUris, clientPostLogoutRedirectUris} = record
    this.setState({
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false,
      selectedIndex: index
    })
    if (record.id !== this.state.id) {
      this.setState({
        id,
        clientName,
        clientId,
        apiScopeName,
        idTokenValiditySeconds,
        accessTokenValiditySeconds,
        refreshTokenValiditySeconds,
        clientRedirectUris,
        clientPostLogoutRedirectUris
      })
    }
    if (!this.state.showInfo) {
      this.setState({
        showInfo: true,
        showUpdateInfo: false
      })
    }
  }

  stopPopGation (e) {
    e.stopPropagation()
    e.cancelBubble = true
  }

  onDelete (index, e) {
    this.stopPopGation(e)
    const {clientList, deleteClientById, setClientShowLoading} = this.props
    const {id, clientId} = clientList[index]
    setClientShowLoading(true)
    deleteClientById(id, clientId)
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

  onPageChange (page) {
    const { getClientsByPage, setClientShowLoading } = this.props
    const {queryClientId} = this.state
    setClientShowLoading(true)
    getClientsByPage(page - 1, queryClientId)
    this.setState({
      currentPage: page,
      selectedIndex: -1
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
    const {clientName, clientId, apiScopeName, idTokenValiditySeconds, accessTokenValiditySeconds, clientSecret,
      refreshTokenValiditySeconds, id, clientRedirectUris, clientPostLogoutRedirectUris} = this.fakeState
    this.setState({
      showInfo: true,
      showUpdateInfo: false,
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false
    })
    this.setState({
      id,
      clientName,
      clientId,
      apiScopeName,
      clientSecret,
      idTokenValiditySeconds,
      accessTokenValiditySeconds,
      refreshTokenValiditySeconds,
      clientRedirectUris,
      clientPostLogoutRedirectUris
    })
  }

  saveBtnClick () {
    const {updateClient} = this.props
    const {id, clientId, clientName, clientSecret, apiScopeName, idTokenValiditySeconds,
      accessTokenValiditySeconds, refreshTokenValiditySeconds, clientPostLogoutRedirectUris,
      clientRedirectUris, currentPage} = this.state
    if (clientId.toString().trim() === '') {
      message.error('客户端ID不能为空！')
      return
    }
    if (clientRedirectUris.length === 0 || (clientRedirectUris.length > 0 && clientRedirectUris[0]['redirectUri'].toString().trim() === '')) {
      message.error('登录重定向地址至少一项！')
      return
    }
    updateClient(currentPage, id, clientId, clientSecret, clientName, idTokenValiditySeconds, accessTokenValiditySeconds,
      refreshTokenValiditySeconds, apiScopeName, JSON.stringify(clientRedirectUris), JSON.stringify(clientPostLogoutRedirectUris))
    this.setState({
      showInfo: true,
      showUpdateInfo: false,
      btnModifyShow: true,
      btnCancelShow: false,
      btnSaveShow: false
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
      case 'queryClientId':
        this.setState({
          queryClientId: value
        })
        break
      case 'clientId':
        this.setState({
          clientId: value
        })
        break
      case 'clientName':
        this.setState({
          clientName: value
        })
        break
      case 'apiScopeName':
        this.setState({
          apiScopeName: value
        })
        break
      case 'idTokenValiditySeconds':
        this.setState({
          idTokenValiditySeconds: value
        })
        break
      case 'accessTokenValiditySeconds':
        this.setState({
          accessTokenValiditySeconds: value
        })
        break
      case 'refreshTokenValiditySeconds':
        this.setState({
          refreshTokenValiditySeconds: value
        })
        break
      case 'clientSecret':
        this.setState({
          clientSecret: value
        })
        break
      default:
        break
    }
  }

  changeAddTxt (type, e) {
    const {value} = e.target
    switch (type) {
      case 'clientId':
        this.setState({
          clientIdAdd: value
        })
        break
      case 'clientName':
        this.setState({
          clientNameAdd: value
        })
        break
      case 'clientSecret':
        this.setState({
          clientSecretAdd: value
        })
        break
      case 'apiScopeName':
        this.setState({
          apiScopeNameAdd: value
        })
        break
      case 'idTokenValiditySeconds':
        this.setState({
          idTokenValiditySecondsAdd: value
        })
        break
      case 'accessTokenValiditySeconds':
        this.setState({
          accessTokenValiditySecondsAdd: value
        })
        break
      case 'refreshTokenValiditySeconds':
        this.setState({
          refreshTokenValiditySecondsAdd: value
        })
        break
      default:
        break
    }
  }

  queryBtnClick () {
    const {getClientsByPage, setClientShowLoading} = this.props
    const {queryClientId} = this.state
    setClientShowLoading(true)
    // if (queryClientId.trim() === '') {
    //   getClientsByPage(0, queryClientId)
    //   return
    // }
    getClientsByPage(0, queryClientId)
    // getClientsByQuery(queryClientId)
    this.setState({
      showInfo: false,
      showUnpdateInfo: false,
      btnModifyShow: false,
      btnCancelShow: false,
      btnSaveShow: false,
      selectedIndex: -1,
      currentPage: 1
    })
  }

  componentWillMount () {
    const {setBreadCrumb, getClientsByPage} = this.props
    const {queryClientId} = this.state
    setBreadCrumb('认证客户端管理')
    getClientsByPage(0, queryClientId)
  }

  handleModalOk () {
    const {addClient} = this.props
    const {clientIdAdd, clientNameAdd, clientSecretAdd, apiScopeNameAdd, idTokenValiditySecondsAdd,
      accessTokenValiditySecondsAdd, refreshTokenValiditySecondsAdd, clientPostLogoutRedirectUrisAdd,
      clientRedirectUrisAdd} = this.state
    if (clientIdAdd.toString().trim() === '') {
      message.error('客户端ID不能为空！')
      return
    }
    addClient(clientIdAdd, clientSecretAdd, clientNameAdd, idTokenValiditySecondsAdd, accessTokenValiditySecondsAdd,
      refreshTokenValiditySecondsAdd, apiScopeNameAdd, JSON.stringify(clientRedirectUrisAdd), JSON.stringify(clientPostLogoutRedirectUrisAdd))
    this.setState({
      modalVisible: false,
      clientIdAdd: '',
      clientNameAdd: '',
      clientSecretAdd: '',
      apiScopeNameAdd: '',
      idTokenValiditySecondsAdd: '600',
      accessTokenValiditySecondsAdd: '3600',
      refreshTokenValiditySecondsAdd: '2592000',
      clientPostLogoutRedirectUrisAdd: [{postLogoutRedirectUri: ''}],
      clientRedirectUrisAdd: [{redirectUri: ''}],
      selectedIndex: -1
    })
  }

  handleModalCancel () {
    this.setState({
      modalVisible: false,
      clientIdAdd: '',
      clientNameAdd: '',
      clientSecretAdd: '',
      apiScopeNameAdd: '',
      idTokenValiditySecondsAdd: '600',
      accessTokenValiditySecondsAdd: '3600',
      refreshTokenValiditySecondsAdd: '2592000',
      clientPostLogoutRedirectUrisAdd: [{postLogoutRedirectUri: ''}],
      clientRedirectUrisAdd: [{redirectUri: ''}]
    })
  }

  deleteItem (type, index) {
    const {clientRedirectUris, clientPostLogoutRedirectUris, clientRedirectUrisAdd, clientPostLogoutRedirectUrisAdd} = this.state
    switch (type) {
      case 'redirectUri':
        clientRedirectUris.splice(index, 1)
        break
      case 'redirectLogoutUri':
        clientPostLogoutRedirectUris.splice(index, 1)
        break
      case 'redirectUriAdd':
        clientRedirectUrisAdd.splice(index, 1)
        break
      case 'redirectLogoutUriAdd':
        clientPostLogoutRedirectUrisAdd.splice(index, 1)
        break
      default:
        break
    }
    this.setState({
      clientRedirectUris,
      clientPostLogoutRedirectUris,
      clientRedirectUrisAdd,
      clientPostLogoutRedirectUrisAdd
    })
  }

  changeUri (value, type, index) {
    const {clientRedirectUris, clientPostLogoutRedirectUris, clientRedirectUrisAdd, clientPostLogoutRedirectUrisAdd} = this.state
    switch (type) {
      case 'redirectUri':
        clientRedirectUris[index]['redirectUri'] = value
        break
      case 'redirectLogoutUri':
        clientPostLogoutRedirectUris[index]['postLogoutRedirectUri'] = value
        break
      case 'redirectUriAdd':
        clientRedirectUrisAdd[index]['redirectUri'] = value
        break
      case 'redirectLogoutUriAdd':
        clientPostLogoutRedirectUrisAdd[index]['postLogoutRedirectUri'] = value
        break
      default:
        break
    }
    this.setState({
      clientRedirectUris,
      clientPostLogoutRedirectUris,
      clientRedirectUrisAdd,
      clientPostLogoutRedirectUrisAdd
    })
  }

  btnAddAdressClick (type) {
    const {clientRedirectUris, clientPostLogoutRedirectUris, clientRedirectUrisAdd, clientPostLogoutRedirectUrisAdd} = this.state
    switch (type) {
      case 'redirectAdd':
        if (clientRedirectUris && clientRedirectUris.length > 0 && clientRedirectUris[clientRedirectUris.length - 1]['redirectUri'].trim() === '') {
          message.error('已经有一个待输入登录重定向地址!')
          return
        }
        clientRedirectUris.push({redirectUri: ''})
        break
      case 'redirectLogoutAdd':
        if (clientPostLogoutRedirectUris && clientPostLogoutRedirectUris.length > 0 && clientPostLogoutRedirectUris[clientPostLogoutRedirectUris.length - 1]['postLogoutRedirectUri'].trim() === '') {
          message.error('已经有一个待输入登出重定向地址!')
          return
        }
        clientPostLogoutRedirectUris.push({postLogoutRedirectUri: ''})
        break
      case 'redirectAddNew':
        if (clientRedirectUrisAdd && clientRedirectUrisAdd.length > 0 && clientRedirectUrisAdd[clientRedirectUrisAdd.length - 1]['redirectUri'].trim() === '') {
          message.error('已经有一个待输入登录重定向地址!')
          return
        }
        clientRedirectUrisAdd.push({redirectUri: ''})
        break
      case 'redirectLogoutAddNew':
        if (clientPostLogoutRedirectUrisAdd && clientPostLogoutRedirectUrisAdd.length > 0 && clientPostLogoutRedirectUrisAdd[clientPostLogoutRedirectUrisAdd.length - 1]['postLogoutRedirectUri'].trim() === '') {
          message.error('已经有一个待输入登出重定向地址!')
          return
        }
        clientPostLogoutRedirectUrisAdd.push({postLogoutRedirectUri: ''})
        break
      default:
        break
    }
    this.setState({
      clientRedirectUris,
      clientPostLogoutRedirectUris,
      clientRedirectUrisAdd,
      clientPostLogoutRedirectUrisAdd
    })
  }

  render () {
    const { clientLoadingShow, clientList, clientCount } = this.props
    const {currentPage, clientName, clientId, apiScopeName, idTokenValiditySeconds, accessTokenValiditySeconds,
      refreshTokenValiditySeconds, queryClientId, selectedIndex, modalVisible, clientSecret, clientRedirectUris,
      clientPostLogoutRedirectUris, clientIdAdd, clientNameAdd, clientSecretAdd, apiScopeNameAdd, idTokenValiditySecondsAdd,
      accessTokenValiditySecondsAdd, refreshTokenValiditySecondsAdd, clientPostLogoutRedirectUrisAdd,
      clientRedirectUrisAdd} = this.state
    return (
      <div>
        <div className={styles.wraper}>
          <Row className={styles.row}>
            <Col className={styles.title} span={2}>客户端ID：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='输入客户端ID' value={queryClientId} onChange={this.changeTxt.bind(this, 'queryClientId')} />
            </Col>
            <Col className={styles.title} offset={12} span={1}>
              <Button type='primary' onClick={this.queryBtnClick.bind(this)}>查询</Button>
            </Col>
            <Col className={styles.title} offset={1} span={1}>
              <Button onClick={this.addBtnClick.bind(this)} type='primary'>添加</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.tbCon}>
          {
            clientLoadingShow ? <Spin className={styles.spin} size='large' /> : null
          }
          <Table onRowClick={this.handleRowClick.bind(this)} dataSource={clientList} columns={this.columns}
            pagination={false} rowClassName={(record, index) => { return index === selectedIndex ? styles.selectedRow : '' }} />
        </div>
        <div className={styles.pageCon} style={{display: clientCount > 0 ? 'block' : 'none'}}>
          <Row>
            <Col offset={12} span={12}>
              <Pagination current={currentPage} onChange={this.onPageChange.bind(this)} pageSize={5} total={clientCount} />
            </Col>
          </Row>
        </div>
        <Row className={styles.btnCon}>
          <Col offset={8} span={8}>
            <BtnGroups showModify={this.state.btnModifyShow} showCancel={this.state.btnCancelShow}
              showSave={this.state.btnSaveShow} onModifyClick={this.modifyBtnClick.bind(this)}
              onCancelClick={this.cancelBtnClick.bind(this)} onSaveClick={this.saveBtnClick.bind(this)} />
          </Col>
        </Row>
        <div className={styles.wraper} style={{display: this.state.showInfo ? 'block' : 'none'}}>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>客户端ID：</Col>
            <Col className={styles.content} span={5}>{clientId || '暂未填写'}</Col>
            <Col className={styles.title} span={5}>客户端名称：</Col>
            <Col className={styles.content} span={5}>{clientName || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>客户端密码：</Col>
            <Col className={styles.content} span={5}>{clientSecret || '暂未填写'}</Col>
            <Col className={styles.title} span={5}>API标识：</Col>
            <Col className={styles.content} span={5}>{apiScopeName || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>ID Token 有效期（秒）：</Col>
            <Col className={styles.content} span={5}>{idTokenValiditySeconds || '暂未填写'}</Col>
            <Col className={styles.title} span={5}>accessToken 有效期（秒）：</Col>
            <Col className={styles.content} span={5}>{accessTokenValiditySeconds || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>refreshToken 有效期（秒）：</Col>
            <Col className={styles.content} span={5}>{refreshTokenValiditySeconds || '暂未填写'}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>登录重定向地址：</Col>
            <Col className={styles.content} span={15}>{_.map(clientRedirectUris, (item, index) => {
              return (
                <Tag key={index}>{item.redirectUri}</Tag>
              )
            })}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>登出重定向地址：</Col>
            <Col className={styles.content} span={15}>{_.map(clientPostLogoutRedirectUris, (item, index) => {
              return (
                <Tag key={index}>{item.postLogoutRedirectUri}</Tag>
              )
            })}</Col>
          </Row>
        </div>
        <div className={styles.wraper} style={{display: this.state.showUpdateInfo ? 'block' : 'none'}}>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>* 客户端ID：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写客户端ID' value={clientId} onChange={this.changeTxt.bind(this, 'clientId')} />
            </Col>
            <Col className={styles.title} span={5}>客户端名称：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写客户端名称' value={clientName} onChange={this.changeTxt.bind(this, 'clientName')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>客户端密码：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写客户端密码' value={clientSecret} onChange={this.changeTxt.bind(this, 'clientSecret')} />
            </Col>
            <Col className={styles.title} span={5}>API标识：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写API标识' value={apiScopeName} onChange={this.changeTxt.bind(this, 'apiScopeName')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>ID Token 有效期（秒）：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写ID Token有效期' value={idTokenValiditySeconds} onChange={this.changeTxt.bind(this, 'idTokenValiditySeconds')} />
            </Col>
            <Col className={styles.title} span={5}>accessToken 有效期（秒）：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写accessToken 有效期' value={accessTokenValiditySeconds} onChange={this.changeTxt.bind(this, 'accessTokenValiditySeconds')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>refreshToken 有效期（秒）：</Col>
            <Col className={styles.content} span={5}>
              <Input placeholder='请填写refreshToken 有效期：' value={refreshTokenValiditySeconds} onChange={this.changeTxt.bind(this, 'refreshTokenValiditySeconds')} />
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>
              <Button type='primary' shape='circle' icon='plus' size='small' onClick={this.btnAddAdressClick.bind(this, 'redirectAdd')} />
              &nbsp;* 登录重定向地址：
            </Col>
            <Col className={styles.content} span={15}>{_.map(clientRedirectUris, (item, index) => {
              return (
                <EditableInput key={index} type='redirectUri' index={index} inputValue={item.redirectUri}
                  onTextChange={this.changeUri.bind(this)} onDeleteItem={this.deleteItem.bind(this)} />
              )
            })}</Col>
          </Row>
          <Row className={styles.row}>
            <Col className={styles.title} offset={1} span={5}>
              <Button type='primary' shape='circle' icon='plus' size='small' onClick={this.btnAddAdressClick.bind(this, 'redirectLogoutAdd')} />
              &nbsp;&nbsp;&nbsp;&nbsp;登出重定向地址：</Col>
            <Col className={styles.content} span={15}>{_.map(clientPostLogoutRedirectUris, (item, index) => {
              return (
                <EditableInput key={index} type='redirectLogoutUri' index={index} inputValue={item.postLogoutRedirectUri}
                  onTextChange={this.changeUri.bind(this)} onDeleteItem={this.deleteItem.bind(this)} />
              )
            })}</Col>
          </Row>
        </div>
        <Modal title='添加认证客户端' visible={modalVisible} okText='确定' cancelText='取消' width='960px'
          onOk={this.handleModalOk.bind(this)} onCancel={this.handleModalCancel.bind(this)}>
          <div className={styles.wraper}>
            <Row className={styles.row}>
              <Col className={styles.title} span={6}>* 客户端ID： </Col>
              <Col className={styles.content} span={5}>
                <Input placeholder='必填' value={clientIdAdd} onChange={this.changeAddTxt.bind(this, 'clientId')} />
              </Col>
              <Col className={styles.title} offset={1} span={6}>客户端密码：</Col>
              <Col className={styles.content} span={5}>
                <Input placeholder='请填写客户端密码' value={clientSecretAdd} onChange={this.changeAddTxt.bind(this, 'clientSecret')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={6}>名称： </Col>
              <Col className={styles.content} span={5}>
                <Input placeholder='请填写名称' value={clientNameAdd} onChange={this.changeAddTxt.bind(this, 'clientName')} />
              </Col>
              <Col className={styles.title} offset={1} span={6}>API标识：</Col>
              <Col className={styles.content} span={5}>
                <Input placeholder='请填写API标识' value={apiScopeNameAdd} onChange={this.changeAddTxt.bind(this, 'apiScopeName')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={6}>ID Token 有效期（秒）： </Col>
              <Col className={styles.content} span={5}>
                <Input placeholder='ID Token有效期' value={idTokenValiditySecondsAdd} onChange={this.changeAddTxt.bind(this, 'idTokenValiditySeconds')} />
              </Col>
              <Col className={styles.title} offset={1} span={6}>accessToken 有效期（秒）：</Col>
              <Col className={styles.content} span={5}>
                <Input placeholder='accessToken 有效期' value={accessTokenValiditySecondsAdd} onChange={this.changeAddTxt.bind(this, 'accessTokenValiditySeconds')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={6}>refreshToken 有效期（秒）： </Col>
              <Col className={styles.content} span={5}>
                <Input placeholder='refreshToken 有效期' value={refreshTokenValiditySecondsAdd} onChange={this.changeAddTxt.bind(this, 'refreshTokenValiditySeconds')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={6}>
                <Button type='primary' shape='circle' icon='plus' size='small' onClick={this.btnAddAdressClick.bind(this, 'redirectAddNew')} />
              &nbsp;登录重定向地址：
            </Col>
              <Col className={styles.content} span={15}>{_.map(clientRedirectUrisAdd, (item, index) => {
                return (
                  <EditableInput key={index} type='redirectUriAdd' index={index} inputValue={item.redirectUri}
                    onTextChange={this.changeUri.bind(this)} onDeleteItem={this.deleteItem.bind(this)} />
                )
              })}</Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={6}>
                <Button type='primary' shape='circle' icon='plus' size='small' onClick={this.btnAddAdressClick.bind(this, 'redirectLogoutAddNew')} />
              &nbsp;登出重定向地址：</Col>
              <Col className={styles.content} span={15}>{_.map(clientPostLogoutRedirectUrisAdd, (item, index) => {
                return (
                  <EditableInput key={index} type='redirectLogoutUriAdd' index={index} inputValue={item.postLogoutRedirectUri}
                    onTextChange={this.changeUri.bind(this)} onDeleteItem={this.deleteItem.bind(this)} />
                )
              })}</Col>
            </Row>
          </div>
        </Modal>
      </div>
    )
  }
}
