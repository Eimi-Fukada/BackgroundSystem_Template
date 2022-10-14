
import { useState } from 'react';

export function ViewModel() {
  /** write your js */
  const [state, setState] = useState(false);

  return {
    state,
    setState,
  };
}
