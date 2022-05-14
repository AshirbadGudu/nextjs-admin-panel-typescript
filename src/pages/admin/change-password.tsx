import { AdminLayout } from 'layouts'
import {
  Button,
  Card,
  CardContent,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { LOGO } from 'assets'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { useAppContext } from 'contexts'
const ChangePasswordSchema = [
  {
    key: '1',
    label: 'New Password',
    name: 'newPassword',
    type: 'password',
    validationSchema: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    initialValue: '',
  },
  {
    key: '2',
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    validationSchema: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      "Passwords don't match"
    ),
    initialValue: '',
  },
]
export default () => {
  const { user } = useAppContext()

  const handleChangePassword = async (values: any, submitProps: any) => {
    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          password: values.newPassword,
        }),
      })
      const result = await response.json()
      if (response.status !== 200)
        return Swal.fire('Error', `${result?.message}`, 'error')
      Swal.fire('Success!', 'Your Password Changed Successfully', 'success')
    } catch (error) {
      submitProps.setSubmitting(false)
      Swal.fire('Error', `Something went wrong please try again`, 'error')
      console.log(error)
    }
  }
  const initialValues = ChangePasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue
      return accumulator
    },
    {} as { [key: string]: string }
  )

  const validationSchema = ChangePasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema
      return accumulator
    },
    {} as { [key: string]: Yup.StringSchema }
  )

  return (
    <AdminLayout title="Change Password - Admin Panel">
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleChangePassword}
        >
          {(formik) => (
            <Form>
              <section className="flex min-h-[35rem] place-content-center px-16 py-6">
                <Card className="m-auto w-1/2 py-4">
                  <div className="flex place-content-center">
                    <img src={LOGO} alt="" className="w-1/3" />
                  </div>
                  <CardContent>
                    {ChangePasswordSchema.map((inputItem) => (
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
                            type={inputItem.type}
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                            helperText={props.meta.touched && props.meta.error}
                            {...props.field}
                          />
                        )}
                      </Field>
                    ))}
                    <div className="flex place-content-center">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                        className={`bg-primary`}
                      >
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </Form>
          )}
        </Formik>
      </>
    </AdminLayout>
  )
}
