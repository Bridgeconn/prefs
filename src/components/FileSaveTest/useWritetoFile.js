import * as localForage from 'localforage';
import { includes } from 'lodash';
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
    },[key, backendfn, values, tag])

    const storeToCustonDB = (customFn) => {
      customFn(key, JSON.stringify(values))
    }

    const storeToDefaultDB = (isDefault) => {
      switch (isDefault.type) {
        case 'localStorage':
            backend(`${key}_default`, values)
            backend(`__tag_${tag}`, key)
          break;
        case 'localForage':
          if(validator.localForage===false){
            localForage.setItem(`${key}`, values, (err) => {
              localForage.getItem(`${key}`, (err, value) => {
                console.log("value from indexed db", value)
              })
            });
            localForage.getItem(`__tag_${tag}`, (err, value) => {
              if(value!==null) {
                let _key = [value]
                _key.push(key)
                localForage.setItem(`__tag_${tag}`, _key, (err) => {
                console.log(err)
                });
                _key = []
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