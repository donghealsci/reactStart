export const generateUUID = () => {
    return parseInt(`${Math.floor(Math.random()*100000)}${Date.now()}`)
}