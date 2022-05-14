import { Visibility, VisibilityOff, LoginOutlined } from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { LOGO } from 'assets'
import { useAppContext } from 'contexts'
import { Formik, Form, Field } from 'formik'
import { PublicLayout } from 'layouts'
import type { NextPage } from 'next'
import { useState } from 'react'
import { LoginSchema } from 'schemas'
import * as Yup from 'yup'

const Login: NextPage = () => {
  const { updateUser } = useAppContext()
  const handleLogin = async (values: any, submitProps: any) => {
    try {
      updateUser?.({
        email: values.email,
        password: values.password,
        uid: '123',
        role: 'admin',
      })
    } catch (error) {
      console.log(error)
    }
  }
  const initialValues = LoginSchema().reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue
    return accumulator
  }, {} as { [key: string]: string })
  const validationSchema = LoginSchema().reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema
    return accumulator
  }, {} as { [key: string]: Yup.StringSchema })
  const [showPassword, setShowPassword] = useState(false)
  return (
    <PublicLayout>
      <main className="grid h-[100vh] w-full place-content-center bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleLogin}
        >
          {(formik) => (
            <Form>
              <>
                <Card>
                  <CardContent>
                    <div className="flex place-content-center py-3">
                      <img src={LOGO} alt="" className="w-32" />
                    </div>
                    {LoginSchema().map((inputItem) => (
                      <Field name={inputItem.name} key={inputItem.key}>
                        {(props: {
                          meta: { touched: any; error: any }
                          field: JSX.IntrinsicAttributes & TextFieldProps
                        }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            label={inputItem.label}
                            type={showPassword ? 'text' : inputItem.type}
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                            helperText={props.meta.touched && props.meta.error}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {inputItem.startIcon}
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  {inputItem.type === 'password' && (
                                    <IconButton
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                    >
                                      {showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  )}
                                </InputAdornment>
                              ),
                            }}
                            {...props.field}
                          />
                        )}
                      </Field>
                    ))}

                    <div className="flex place-content-center py-4">
                      <Button
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                        variant="contained"
                        color="primary"
                        className="bg-primary"
                        size="large"
                        startIcon={<LoginOutlined />}
                      >
                        Login
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            </Form>
          )}
        </Formik>
      </main>
    </PublicLayout>
  )
}

export default Login
