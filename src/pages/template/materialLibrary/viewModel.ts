import { useState } from 'react';

export function ViewModal() {
  /** write your js */
  const [state, setState] = useState(false);

  return {
    state,
    setState,
  };
}
