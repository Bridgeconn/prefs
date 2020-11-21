import { Box, Button, FormControl, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useSavetoLocal from './useSavetoFile'
import * as helper from "../../core/backend"
import { WriteToFile } from '../../core/writefile'
import useWritetoFile from './useWritetoFile'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const localStorageConfig = {
  type: "localStorage",
  name: "profile",
  maxSize: "5MB",
}
const localForageConfig = {
  type: "localForage",
  name: "profile",
  maxSize: "5MB",
}

const fsConfig = {
  type: "fs",
  name: "profile_default",
  maxSize: "5MB",
}

export default function FileSaveTest() {
    const [values, setValues] = useState({
        first:"",
        last: "",
        email: "",
        password: "",
        showPassword: false,
      });
    const [selectedBackendstore, setSelectedBackendstore  ] = useState(localStorageConfig)
    
    const { 
        state: { initialValue, value }, 
        actions: { setBackendFunction } 
    } = useSavetoLocal ({
            key: "profile",  
            value: values, 
            backendfn: helper
        })
    const {
      state: { validator,
        validationMessage },
        action: setBackend
    } = useWritetoFile({ key: "settings",  values: values, backendfn: selectedBackendstore, tag: "app" })
    // console.log(validator,
    //   validationMessage )
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    useEffect(() => {
        setValues(initialValue)
    }, [])

    useEffect(() => {
        setBackendFunction("profile", value, helper)
    }, [values])

    const handleBackendSave = (event) => {
      setSelectedBackendstore(event.target.value)
    }


    return (
        <>
        <Paper>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <form
              noValidate
              autoComplete="off"
              
            >
              <Typography
                variant="h6"
                color="inherit"
              >
                <Box fontWeight={600} m={1}>
                  Settings
                </Box>
              </Typography>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    type="text"
                    value={values.first}
                    onChange={handleChange('first')}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    value={values.last}
                    onChange={handleChange('last')}

                  />
              <div>
                    <TextField
                    label="Email"
                      variant="outlined"
                      value={values.email}
                    onChange={handleChange('email')}
                    />
              </div>
              <div>
                <FormControl
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    onChange={handleChange('password')}
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                   <FormLabel component="legend">
          <Box fontWeight={600} m={1}>
            Select Backend
          </Box>
        </FormLabel>
        <Select
          variant="outlined"
          value={selectedBackendstore}
          onChange={(event) => handleBackendSave(event)}
        >
            <MenuItem value={localStorageConfig}>
              localStorage
            </MenuItem>
            <MenuItem value={localForageConfig}>
              localForage
            </MenuItem>
            <MenuItem value={fsConfig}>
              fsWrite
            </MenuItem>
          </Select>
                </FormControl>
              </div>
            </form>
          </Grid>
        </Grid>
      </Paper>
        </>
    )
}
