export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)
}


export const isOpera = () => {
  return window.navigator.userAgent.indexOf('Opera') > -1
}
export const isIE = () => {
  return window.navigator.userAgent.indexOf('compatible') > -1 && 
         window.navigator.userAgent.indexOf('MSIE') > -1 && !isOpera()
}
export const isEdge = () => {
  return  window.navigator.userAgent.indexOf('Windows NT 6.1;') > -1 && 
          window.navigator.userAgent.indexOf('Trident/7.0;') > -1 && 
          !isIE()
} 
