import * as localForage from 'localforage';
import { useCallback, useEffect, useState } from 'react';
import { backend } from "../../core/backend";
import { WriteToFile } from "../../core/writefile";
import useValidation from './useValidator';

const isFunction = async(backendfn) => {
  if (backendfn instanceof Function) {
    return backendfn
  }
}
 
export default function useWritetoFile({ key, values, backendfn, tag }) {
  
  const { validator, validationMessage, keyExists, setValidator } = useValidation({ key: key, backendStore: backendfn.type })

    useEffect(() => {
        setBackend()
    }, [key, backendfn])

    useEffect(() => {
      keyExists()
    },[])

    const setBackend = useCallback(() => {
      isFunction(backendfn).then((res) => {
        if(res){
          storeToCustonDB(res)
        }
        else{
          storeToDefaultDB(backendfn, tag)
        }
      })
    },[key, backendfn])

    const storeToCustonDB = (customFn) => {
      customFn(key, JSON.stringify(values))
    }

    const storeToDefaultDB = (isDefault) => {
      switch (isDefault.type) {
        case 'localStorage':
          if(validator.localStorage===false){
            backend(`${key}_default`, values)
            backend(`__tag_${tag}`, key)
            // setValidator({ ...validator, ['localStorage']: false });
          }
          break;
        case 'localForage':
          if(validator.localForage===false){
            localForage.setItem(`${key}`, values, (err) => {
              localForage.getItem(`${key}`, (err, value) => {
                console.log("value from indexed db", value)
              })
            });
            console.log(`__tag_${tag}`)
            localForage.getItem(`__tag_${tag}`, (err, value) => {
              var _key = [value]
              if(value!==null) {
                _key.push(key)
                console.log(_key)
                localForage.setItem(`__tag_${tag}`, _key, (err) => {
                console.log(err)
                });
              }else {
                localForage.setItem(`__tag_${tag}`, key, (err) => {
                  console.log(err)
                  });
              }
            })
            
            
          }
          break;
          case 'fs':
            WriteToFile(`${key}_default`, JSON.stringify(values), isDefault.name)
            break;
      }
    }

  return {
    state: { validator,
      validationMessage },
      action: setBackend
  };
}