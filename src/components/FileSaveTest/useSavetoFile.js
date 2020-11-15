import React, { useEffect } from "react";

export default function useSavetoFile(key, values, backendfn) {
  const [ initialValue ] = React.useState(backendfn.getInitialValue(key, values))
  const [backendfunction, setBackendFunction] = React.useState(backendfn.backend(key, values))

  useEffect(() => {
    backendfn.backend(key, values)
  }, [backendfunction])

  return {
    initialValue,
    values,
    setBackendFunction,
  };
}
