import { useEffect, useReducer } from 'react'
import { getArrFromNestedSnap, getArrFromSnap } from '@ashirbad/js-core'
import useIsMounted from './useIsMounted'
import { database } from 'configs'

type Options = {
  needArray?: boolean
  needNested?: boolean
  filter?: (data: any) => boolean
}

type dataType = {
  data: any
  isLoading: boolean
}
type reducerActionType = {
  type: 'needArray' | 'needNested' | 'filter' | 'raw'
  payload: {
    snap: any
  }
}

const dataReducer = (state: dataType, action: reducerActionType): dataType => {
  switch (action.type) {
    case 'needArray':
      return {
        data: getArrFromSnap(action.payload.snap),
        isLoading: false,
      }
    case 'needNested':
      return {
        data: getArrFromNestedSnap(action.payload.snap),
        isLoading: false,
      }
    case 'raw':
      return {
        data: action.payload.snap.val(),
        isLoading: false,
      }
    default:
      return state
  }
}

export default function useFetch<T>(path: string, options?: Options) {
  const needArray = options?.needArray === false ? false : true
  const needNested = Boolean(options?.needNested)
  const filter = options?.filter || (() => true)
  const [state, dispatch] = useReducer(dataReducer, {
    data: null,
    isLoading: true,
  })
  const isMounted = useIsMounted()

  useEffect(() => {
    database.ref(path).on('value', (snap) => {
      let type: 'needArray' | 'needNested' | 'filter' | 'raw' = 'raw'
      if (needNested) type = 'needNested'
      if (!needNested && needArray) type = 'needArray'
      isMounted.current && dispatch({ type, payload: { snap } })
    })
  }, [isMounted, needArray, needNested, path])
  type ReturnType = [T, boolean]
  const returnType: ReturnType = [
    needArray ? state.data?.filter(filter) : state.data,
    state.isLoading,
  ]
  return returnType
}
