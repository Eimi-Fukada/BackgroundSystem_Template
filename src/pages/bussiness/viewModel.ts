import { useEffect, useState } from 'react';

export function ViewModel() {
  /** write your js */
  const [state, setState] = useState(false);
  const [data, setData] = useState([]);
  const [Hexbin, setHexbin] = useState([]);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const asyncHexbinMapFetch = () => {
    fetch('https://gw.alipayobjects.com/os/basement_prod/a1a8158d-6fe3-424b-8e50-694ccf61c4d7.csv')
      .then((response) => response.text())
      .then((json: any) => setHexbin(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  useEffect(() => {
    asyncFetch();
    asyncHexbinMapFetch();
  }, []);

  return {
    state,
    setState,
    data,
    Hexbin,
  };
}
