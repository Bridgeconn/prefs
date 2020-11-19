import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import useSavetoFile from './useSavetoFile'
import * as helper from "../../core/backend"
import { WriteToFile } from '../../core/writefile'
import useWritetoFile from './useWritetoFile'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function FileSaveTest() {
    const [values, setValues] = React.useState({
        first:"",
        last: "",
        email: "",
        password: "",
        showPassword: false,
      });
    const { 
        state: { initialValue, value }, 
        actions: { setBackendFunction} 
    } = useSavetoFile ({
            key: "profile",  
            value: values, 
            backendfn: helper
        })

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

    const WriteAndDownload = (event) => {
        event.preventDefault()
        useWritetoFile({key: "profile",  values: value, backendfn: WriteToFile})
    }

    return (
        <>
        <Paper>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={WriteAndDownload}
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
                </FormControl>
              </div>
              <Button
            variant="contained"
            type="submit"
            >Save</Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
        </>
    )
}
