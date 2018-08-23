import {connect} from 'react-redux'
import Detail from 'components/Detail'
import {loadResultRequest, loadCaseInfoByCaseId, clearCaseInfo} from 'actions'

const mapStateToProps = state => {
  const {name, locations, patientAge, patientGender, defaultSlideUrl} = state.cases.caseInfo
  const gender = {
    1: '男',
    2: '女',
    3: '其他'
  }
  const month = patientAge % 12 === 0 ? '' : patientAge % 12 + '个月'
  const age = Math.floor(patientAge / 12) > 0 ? Math.floor(patientAge / 12) + '岁' + month : month
  const showAge = patientAge ? `，${age}` : ''
  let thumbnailUrl = defaultSlideUrl ? defaultSlideUrl.substring(0, defaultSlideUrl.length - 4) + '_files/8/0_0.jpg' : ''
  return {
    // showVote: state.vote && state.vote.topicId === -1 ? false : (!(state.vote && state.vote.voteStatus === 0))
    showVote: !!state.vote && state.vote.topicId !== -1 && state.vote.voteStatus !== 0,
    caseName: name,
    locations: locations ? locations.join(',') : '',
    showAge: showAge,
    Gender: gender[patientGender],
    accessTicket: state.MeetupIndex.accessTicket,
    thumbnailUrl: thumbnailUrl
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadVote: (caseId, groupId) => {
      dispatch(loadResultRequest(caseId, groupId))
    },
    loadCaseInfo: (caseId, groupId) => {
      dispatch(loadCaseInfoByCaseId(caseId, groupId))
    },
    clearCaseInfo: () => {
      dispatch(clearCaseInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
