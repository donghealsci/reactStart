import { Button } from 'antd'

export default class BtnGroups extends React.Component {
  render () {
    const {showModify, showCancel, showSave,
      onModifyClick, onCancelClick, onSaveClick} = this.props
    return (
      <div>
        <Button type='primary' style={{display: showModify ? 'inline-block' : 'none'}} onClick={() => { onModifyClick() }}>
          修改
        </Button>
        <Button style={{display: showCancel ? 'inline-block' : 'none'}} onClick={() => { onCancelClick() }}>
          取消
        </Button>
        <Button type='primary' style={{display: showSave ? 'inline-block' : 'none'}} onClick={() => { onSaveClick() }}>
          保存
        </Button>
      </div>
    )
  }
}
