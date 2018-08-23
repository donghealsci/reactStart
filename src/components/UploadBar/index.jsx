import { Icon } from 'antd'
import * as styles from './uploadBar.scss'

export default class UploadBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hoverIndex: -1
    }
  }
  mouseOver (index) {
    this.setState({
      hoverIndex: index
    })
  }

  mouseOut () {
    this.setState({
      hoverIndex: -1
    })
  }
  clearImgValue () {
    this.fileInput.value = ''
  }
  clearUploadImg () {
    const {clearImg} = this.props
    this.fileInput.value = ''
    clearImg()
  }
  fileUploadChange () {
    const {imgList, fileChange} = this.props
    const files = this.fileInput.files
    if (files && files.length > 0) {
      let file = files[0]
      let imgListTemp = imgList
      imgListTemp.push(window.URL.createObjectURL(file))
      fileChange(imgListTemp, file)
    }
  }
  render () {
    const {imgList} = this.props
    const {hoverIndex} = this.state
    return (
      <div>
        {
          _.map(imgList, (item, index) => {
            return (
              <div key={index} className={styles.uploadImg} onMouseOver={this.mouseOver.bind(this, index)} onMouseOut={this.mouseOut.bind(this)}>
                <img src={item} alt='' />
                <div className={styles.bgDiv} style={{display: index === hoverIndex ? 'inline-block' : 'none'}}>
                  <Icon type='delete' onClick={this.clearUploadImg.bind(this)} className={styles.delete} />
                </div>
              </div>
            )
          })
        }
        <div className={styles.inputWraper} style={{'display': imgList.length > 0 ? 'none' : 'inline-block'}}>
          <input className={styles.inputCon} type='file' ref={input => {
            this.fileInput = input
          }} onChange={this.fileUploadChange.bind(this)} />
          <span className={styles.uploadTxt}>点击上传logo</span>
        </div>
      </div>
    )
  }
}
