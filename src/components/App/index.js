import 'styles/reset.css'
import store from 'store'
import Routes from 'routes'
import {Provider} from 'react-redux'
import initReactFastclick from 'react-fastclick'

initReactFastclick()

export default class App extends React.Component {
  componentDidMount () {
    // store.dispatch(loadCaseCategories())
  }

  render () {
    return (
      <Provider {...{store}}>
        <Routes />
      </Provider>
    )
  }
}
