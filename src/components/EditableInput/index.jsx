import { Col, Button, Input } from 'antd'
import * as styles from './editableInput.scss'

export default class EditableInput extends React.Component {
  render () {
    const {inputValue, onTextChange, type, index, onDeleteItem} = this.props
    return (
      <Col className={styles.content} span={12}>
        <Col className={styles.content} span={20}>
          <Input value={inputValue} onChange={(e) => { onTextChange(e.target.value, type, index) }} />
        </Col>
        <Col span={3} className={styles.btnMinus}>
          <Button type='primary' shape='circle' icon='minus' size='small' onClick={() => { onDeleteItem(type, index) }} />
        </Col>
      </Col>
    )
  }
}
