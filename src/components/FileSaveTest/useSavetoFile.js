import { useEffect, useState } from "react";

export default function useSavetoLocal({ 
  key, 
  value, 
  backendfn 
}) {
  const [ initialValue ] = useState(
    backendfn.getInitialValue(key, value)
  )
  const [backendfunction, setBackendFunction] = useState(
    backendfn.backend(key, value)
  )

  useEffect(() => {
    backendfn.backend(key, value)
  }, [backendfunction])

  return {
    state: { initialValue, value },
    actions: { setBackendFunction },
  };
}
