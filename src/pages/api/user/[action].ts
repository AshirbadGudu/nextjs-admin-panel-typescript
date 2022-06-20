import { admin } from 'constant'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'types'

type Data = {
  message: string
  error: Error
  User: Partial<User>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Data>>
) {
  const body = req?.body
  const actions = {
    create: async () => {
      if (req.method !== 'POST')
        return res.status(405).json({ message: 'Method not allowed' })
      try {
        const response = await admin.auth().createUser({
          displayName: body.displayName,
          email: body.email,
          password: body.password,
        })
        const UserResponse: Partial<User> = {
          displayName: body.displayName,
          email: body.email,
          password: body.password,
          uid: response.uid,
          isBlocked: false,
          role: body?.role ?? 'user',
          updatedAt: new Date().toString(),
          createdAt: new Date().toString(),
        }
        const { dbRef, additionalData = {} } = body
        if (dbRef)
          await admin
            .database()
            .ref(`/${dbRef}/${response.uid}`)
            .update({ ...UserResponse, ...additionalData })
        res
          .status(200)
          .json({ message: 'User created successfully', User: UserResponse })
      } catch (error: any) {
        res.status(500).json({
          error: error,
          message: error?.message || 'Error creating user',
        })
      }
    },
    update: async () => {
      if (req.method !== 'PUT')
        return res.status(405).json({ message: 'Method not allowed' })
      try {
        await admin.auth().updateUser(body.uid, {
          displayName: body.displayName,
          email: body.email,
          password: body.password,
        })
        const UserResponse: User = {
          displayName: body.displayName,
          email: body.email,
          password: body.password,
          ...body,
          updatedAt: new Date().toString(),
        }
        if (body?.dbRef)
          await admin
            .database()
            .ref(`/${body?.dbRef}/${body.uid}`)
            .update(UserResponse)
        res
          .status(200)
          .json({ message: 'User updated successfully', User: UserResponse })
      } catch (error) {
        res.status(500).json({ error: error as Error })
      }
    },
    delete: async () => {
      if (req.method !== 'DELETE')
        return res.status(405).json({ message: 'Method not allowed' })
      try {
        await admin.auth().deleteUser(body.uid)
        if (body?.dbRef)
          await admin.database().ref(`/${body?.dbRef}/${body.uid}`).remove()
        res.status(200).json({
          message: 'User deleted successfully',
          User: { uid: body.uid },
        })
      } catch (error) {
        res.status(500).json({ error: error as Error })
      }
    },
    deleteAll: async () => {
      if (req.method !== 'DELETE')
        return res.status(405).json({ message: 'Method not allowed' })
      try {
        const { uids, dbRef } = body as { uids: string[]; dbRef: string }
        if (uids.length) {
          await admin.auth().deleteUsers(uids)
          await Promise.all(
            uids.map((uid) => admin.database().ref(`/${dbRef}/${uid}`).remove())
          )
          res.status(200).json({
            message: `${uids.length} users deleted successfully`,
          })
        }
      } catch (error) {
        res.status(500).json({ error: error as Error })
      }
    },
  }
  const action = req.query?.action as keyof typeof actions
  if (action in actions) return await actions[action]()
  res.status(404).json({ message: 'Not found' })
}
