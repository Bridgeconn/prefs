import { Button, Input } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useSavetoFile from './useSavetoFile'
import * as helper from "../../core/backend"
import { WriteToFile } from '../../core/writefile'
import useWritetoFile from './useWritetoFile'

export default function FileSaveTest() {
    const [email, setEmail] = useState("")
    const { initialValue, values, setBackendFunction } = useSavetoFile("email", email, helper)
    useEffect(() => {
       setEmail(initialValue)
    }, [])
    useEffect(() => {
        setBackendFunction("email", values, helper)
    }, [email])

    const WriteAndDownload = () => {
        useWritetoFile("email", values, WriteToFile)
    }

    return (
        <>
            <Input
            type="text"
            value={values}
            onChange={e => setEmail(e.target.value)}
            />
            <Button
            variant="contained"
            onClick={WriteAndDownload}
            >Write</Button>
        </>
    )
}
