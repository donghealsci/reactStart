const middlewareHandler = (store, next, action, userManager) => {
    let user = userManager.getUserSync()

    if(user && user.expires_at * 1000 < Date.now()){
        userManager.removeUser()
    }

    return next(action)
}

export default function createOidcMiddleWare(userManager) {
    if (!userManager || !userManager.getUser) {
        throw new Error('You must provide a user manager!')
    }
    return (store) => (next) => (action) => {
        middlewareHandler(store, next, action, userManager)
    }
}
