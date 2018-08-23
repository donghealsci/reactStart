const storage = window.sessionStorage
export const setItem = (key,value) =>{
  return storage.setItem(`healsci-${key}`,value)
}

export const getItem = (key)=>{
  return storage.getItem(`healsci-${key}`)
}

export const removeItem = (key)=>{
  return storage.removeItem(`healsci-${key}`)
}