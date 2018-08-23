import {
  userFound, 
  userSignedOut,
  userExpired
} from './actions'

export default class OidcProvider extends React.Component {
  constructor(props) {
    super(props)
    this.userManager = props.userManager
  }

  componentWillMount() {
    // register the event callbacks
    this.userManager.events.addUserLoaded(this.onUserLoaded.bind(this))
    this.userManager.events.addUserSignedOut(this.onUserSignedOut.bind(this))
    this.userManager.events.addAccessTokenExpired(this.onAccessTokenExpired.bind(this))
  }

  componentWillUnmount() {
    // unregister the event callbacks
    this.userManager.events.removeUserLoaded(this.onUserLoaded.bind(this))
    this.userManager.events.removeUserSignedOut(this.onUserSignedOut.bind(this))
    this.userManager.events.removeAccessTokenExpired(this.onAccessTokenExpired.bind(this))
  }

  // event callback when the user has been loaded (on silent renew or redirect)
  onUserLoaded(user) {
    this.props.store.dispatch(userFound(user))
  }
  // event callback when the user is signed out
  onUserSignedOut() {
    this.props.store.dispatch(userSignedOut())
  }

  onAccessTokenExpired() {
    this.userManager.removeUser()
    this.props.store.dispatch(userExpired())
  }

  render() {
    return this.props.children
  }
}

OidcProvider.propTypes = {
  userManager: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}