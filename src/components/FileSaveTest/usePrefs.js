import { useCallback, useEffect, useState } from 'react';
import { getInitialValue } from '../../core/backend';
import { tolocalStorageCreate, updateLocalStorage } from '../../core/tolocaStorage';
import useValidation from './useValidator';

const isFunction = async(backendfn) => {
  if (backendfn instanceof Function) {
    return backendfn
  }
}
 
export default function usePrefs({ 
  key, 
  values, 
  backendfn, 
  tag 
}) {
  const { 
    validator, 
    validationMessage, 
    keyExists, 
    setValidator } 
    = useValidation({ 
      key: key, 
      backendStore: backendfn.type
    })

    const [ initialValue ] = useState(getInitialValue(key, values))

    useEffect(() => {
      setBackendStore()
    }, [backendfn])

    useEffect(() => {
      keyExists()
    },[])

    const setBackendStore = useCallback(() => {
      isFunction(backendfn).then((res) => {
        if(res){
          storeToCuston(res)
        }
        else{
          tolocalStorageCreate(backendfn, values, tag, validator, key, keyExists)
        }
      })
    },[key, backendfn, values, tag, validator])

    const storeToCuston = (customFn) => {
      customFn(key, JSON.stringify(values))
    }

    const updateStorage = () => {
      updateLocalStorage(backendfn, values, validator, key)
    }   

  return {
    state: { 
      validator,
      validationMessage,
      initialValue
    },
    action: { 
      setBackendStore, 
      updateStorage
    }
  };
}