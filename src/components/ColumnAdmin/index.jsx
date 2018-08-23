import React from 'react'
import * as styles from './columnAdmin.scss'
// import BtnGroups from 'components/BtnGroups'
// import {Button} from 'antd'
import { Table, Popconfirm, Button, Row, Col, Input, Pagination, Modal, message, Spin, Checkbox, Select } from 'antd'
const Option = Select.Option
const CheckboxGroup = Checkbox.Group

export default class ColumnAdmin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      queryColumnName: '',
      columnLoadingShow: false,
      selectedIndex: 0,
      currentPage: 1,
      modalVisible: false,
      nameAdd: '',
      appCheckedItems: [],
      columnList: [
        {
          id: 1,
          name: '栏目1',
          belongProj: '项目A'
        },
        {
          id: 2,
          name: '栏目2',
          belongProj: '项目A'
        },
        {
          id: 3,
          name: '栏目3',
          belongProj: '项目B'
        },
        {
          id: 4,
          name: '栏目4',
          belongProj: '项目B'
        },
        {
          id: 5,
          name: '栏目5',
          belongProj: '项目A'
        }
      ],
      columnCount: 5
    }
    this.columns = [{
      title: '栏目',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '所属客户端',
      dataIndex: 'belongProj',
      key: 'belongProj'
    }, {
      title: '删除',
      dataIndex: '删除',
      render: (text, record, index) => {
        return (
          <Popconfirm title='确定删除该栏目？' okText='确定' cancelText='取消' onClick={(e) => { this.stopPopGation(e) }} onCancel={(e) => { this.stopPopGation(e) }} onConfirm={(e) => this.onDelete(index, e)}>
            <a href='#'>删除</a>
          </Popconfirm>
        )
      }
    }]
  }

  componentWillMount () {
    const {setBreadCrumb, getAllAppRoles} = this.props
    setBreadCrumb('App资讯', '栏目管理')
    getAllAppRoles()
  }

  stopPopGation (e) {
    e.stopPropagation()
    e.cancelBubble = true
  }

  onDelete (index, e) {
    this.stopPopGation(e)
    // const {deleteAppById, appList, setAppShowLoading} = this.props
    // const {id, name} = appList[index]
    // setAppShowLoading(true)
    // deleteAppById(id, name)
    // this.setState({
    //   currentPage: 1,
    //   selectedIndex: -1
    // })
    // if (id === this.state.id) {
    //   this.setState({
    //     btnModifyShow: false,
    //     btnCancelShow: false,
    //     btnSaveShow: false,
    //     showInfo: false,
    //     showUpdateInfo: false
    //   })
    // }
  }

  changeTxt (type, e) {

  }

  addBtnClick () {
    this.setState({
      modalVisible: true
    })
  }

  queryBtnClick () {

  }

  handleRowClick (record, index) {
    this.setState({
      selectedIndex: index
    })
  }

  onPageChange () {

  }

  handleModalOk () {

  }

  handleModalCancel () {
    this.setState({
      modalVisible: false
    })
  }

  changeAddTxt (type, e) {

  }

  checkboxChange (checkedValues) {
    this.setState({
      appCheckedItems: checkedValues
    })
  }

  selectChange (value) {
    // const { getGroupByPage, setGroupShowLoading } = this.props
    // const queryCode = value === 'all' ? '' : value
    // setGroupShowLoading(true)
    // getGroupByPage(0, queryCode)
    // this.setState({
    //   selectedAppCode: value,
    //   currentPage: 1,
    //   selectedIndex: -1
    // })
  }

  render () {
    const {queryColumnName, columnLoadingShow, columnList, selectedIndex, columnCount, currentPage,
      modalVisible, nameAdd, appCheckedItems} = this.state
    const {appList} = this.props
    return (
      <div>
        <div className={styles.wraper}>
          <Row className={styles.row}>
            <Col className={styles.title} span={2}>客户端名称：</Col>
            <Col className={styles.content} span={5}>
              <Select defaultValue='all' style={{width: '200px'}} onChange={this.selectChange.bind(this)}>
                <Option value='all'>所有客户端</Option>
                {
                  _.map(appList, (item, index) => {
                    return (
                      <Option key={index} value={item.value}>{item.label}</Option>
                    )
                  })
                }
              </Select>
            </Col>
            <Col className={styles.title} span={2}>栏目名称：</Col>
            <Col className={styles.content} span={3}>
              <Input placeholder='输入栏目名称搜索' value={queryColumnName} onChange={this.changeTxt.bind(this, 'queryColumnName')} />
            </Col>
            <Col className={styles.title} offset={5} span={1}>
              <Button type='primary' onClick={this.queryBtnClick.bind(this)}>查询</Button>
            </Col>
            <Col className={styles.title} offset={1} span={1}>
              <Button onClick={this.addBtnClick.bind(this)} type='primary'>添加</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.tbCon}>
          {
            columnLoadingShow ? <Spin className={styles.spin} size='large' /> : null
          }
          <Table onRowClick={this.handleRowClick.bind(this)} dataSource={columnList} columns={this.columns}
            pagination={false} rowClassName={(record, index) => { return index === selectedIndex ? styles.selectedRow : '' }} />
        </div>
        <div className={styles.pageCon} style={{display: columnCount > 0 ? 'block' : 'none'}}>
          <Row>
            <Col offset={12} span={12}>
              <Pagination current={currentPage} onChange={this.onPageChange.bind(this)} pageSize={5} total={columnCount} />
            </Col>
          </Row>
        </div>
        <Modal title='添加栏目' visible={modalVisible} okText='确定' cancelText='取消' width='960px'
          onOk={this.handleModalOk.bind(this)} onCancel={this.handleModalCancel.bind(this)}>
          <div className={styles.wraper}>
            <Row className={styles.row}>
              <Col className={styles.title} span={5}>* 栏目名称： </Col>
              <Col className={styles.content} span={6}>
                <Input placeholder='必填' value={nameAdd} onChange={this.changeAddTxt.bind(this, 'name')} />
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col className={styles.title} span={5}>* 所属客户端： </Col>
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
