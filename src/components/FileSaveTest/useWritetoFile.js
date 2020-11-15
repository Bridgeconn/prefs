import React, { useEffect } from "react";

export default function useWritetoFile(key, values, backendfn) {
  const [ writefile, setWriteFile] = React.useState(backendfn(key, values))

  useEffect(() => {
    backendfn(key, values)
  }, [writefile])

  return {
    setWriteFile
  };
}