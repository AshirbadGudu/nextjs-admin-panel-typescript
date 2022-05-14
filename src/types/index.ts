import { ReactChild, ReactFragment, ReactPortal, SVGProps } from 'react'

export type IconType = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>

export type AppContextType = {
  user?: Partial<User> | null
  updateUser?: (updatedUserData: Partial<User>) => Promise<void>
}
export type AppContextProviderType = {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined
}

export type UserRole = 'admin' | 'user'

export type User = {
  uid: string
  displayName: string
  phoneNumber: string
  email: string
  password: string
  photoURL: string
  createdAt: string
  updatedAt: string
  isBlocked: boolean
  photoRef: string
  role: UserRole
  isOnline: boolean
}
