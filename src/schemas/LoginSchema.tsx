import { LockOpen, MailOutline } from '@mui/icons-material'
import * as Yup from 'yup'
export default () => [
  {
    key: '1',
    label: 'Enter your email',
    name: 'email',
    type: 'email',
    validationSchema: Yup.string()
      .required('Email is required')
      .email('Invalid Email Address'),
    initialValue: '',
    startIcon: <MailOutline />,
  },
  {
    key: '2',
    label: 'Enter your password',
    name: 'password',
    type: 'password',
    validationSchema: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    initialValue: '',
    startIcon: <LockOpen />,
  },
]
