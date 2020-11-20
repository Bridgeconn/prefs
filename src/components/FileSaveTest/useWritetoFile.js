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
 
export default function useWritetoFile({ key, values, backendfn }) {
  const [ validationError, SetValidatoinError] = useState(false)
  const [ validationMessage, SetValidatoinMessage] = useState(null)
  
  const setBackend = () => {
      isFunction(backendfn).then((res) => {
        if(res){
          storeToCustonDB(res)
        }
        else{
          storeToDefaultDB(backendfn)
        }
      })
    }

    const storeToCustonDB = (customFn) => {
      customFn(key, JSON.stringify(values))
    }

    // useEffect(() => {
    //   keyValidation(key, backendfn)
    // }, [key])
  

    const storeToDefaultDB = (isDefault) => {
      switch (isDefault.type) {
        case 'localStorage':
          backend(`${key}_default`, values)
          break;
        case 'localForage':
          localForage.setItem(`${key}_default1`, values, (err) => {
            localForage.getItem(`${key}_default1`, (err, value) => {
              console.log("value from indexed db", value)
            });
          });
          break;
          case 'fs':
            WriteToFile(`${key}_default`, JSON.stringify(values), isDefault.name)
            break;
      }
    }

  return {
    state: { validationError,
      validationMessage },
      action: setBackend
  };
}