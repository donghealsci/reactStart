import * as styles from './empty.scss'

export default class Empty extends React.Component {
    render(){
        const {hint, width, height} = this.props
        const imgStyle = {
            width,
            height
        }
        return (
            <div className={styles.outer}>
                <div className={styles.img} style={imgStyle}></div>
                <div className={styles.hint}>{hint}</div>
            </div>
        )
    }
}

Empty.defaultProps = {
    hint: '暂时没有内容',
    width: 260,
    height: 260
}