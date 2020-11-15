export function getInitialValue(key, initValue) {
const valueSaved = JSON.parse(localStorage.getItem(key))
   if(valueSaved) return valueSaved
   return initValue
}

export function backend(key, propValues) {
    localStorage.setItem(key, JSON.stringify(propValues))
    return JSON.parse(localStorage.getItem(key))
}
