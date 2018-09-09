import store from 'store'





export const get = ( key ) => {
  return store.get(key )
}

export const set = ( key, value ) => {
  store.set( key, value)
}

export const remove = ( key, value ) => {
  store.remove(key)
}

export const clear = () => {
  store.clearAll()
}