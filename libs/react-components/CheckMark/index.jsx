import * as styles from './check-mark.scss'

export default class CheckMark extends React.Component {
    render() {
        const {width, height} = this.props
        return  (
            <svg 
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                width={width}
                height={height}
                viewBox="0 0 161.2 161.2">
                <polyline 
                    className={styles.check} 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeMiterlimit="10" 
                    points="113,52.8 74.1,108.4 48.2,86.4 "/>
            </svg>
        )
    }
}

CheckMark.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}