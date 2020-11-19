import { useEffect, useState } from "react";

export default function useWritetoFile({ key, values, backendfn }) {
  const [ writefile, setWriteFile] = useState(
    backendfn(
    key,  
    JSON.stringify(values)
  ))

  useEffect(() => {
    backendfn(key, JSON.stringify(values))
  }, [writefile])

  return {
    setWriteFile
  };
}