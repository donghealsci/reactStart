import {connect} from 'react-redux'
import Classify from 'components/Classify'
import {clearFilter, setFilterMask, changeFixedTop} from 'actions'

const mapStateToProps = state => {
  return {
    caseCategories: state.caseCategories,
    filterTxt: state.filter.filterTxt,
    filterMaskShow: state.filter.filterShow,
    fixedTop: state.bodyFixedTop
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearFilter: (filterTxt) => {
      dispatch(clearFilter(filterTxt))
    },
    setFilterMask: (isFilterShow) => {
      dispatch(setFilterMask(isFilterShow))
    },
    changeFixedTop: (stop) => {
      dispatch(changeFixedTop(stop))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classify)
