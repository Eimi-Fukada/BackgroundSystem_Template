import { useState } from 'react'

export function useViewModel() {
  /** write your js */
  const [state, setState] = useState(false)

  return {
    state,
    setState,
  }
}
