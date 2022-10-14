import { useSuperLock } from '@/hooks/useSuperLock';
import { useState } from 'react';
import { history } from 'umi';

export function ViewModel() {
  /** write your js */
  const [state, setState] = useState<any>([]);

  const [submit, loading] = useSuperLock(async () => {});

  return {
    state,
    setState,
    submit,
    loading,
  };
}
