import md5 from 'md5';
import React, { useState, useEffect } from 'react';

const xAuth = md5('Valantis_20240229');

const App = () => {
  const [product, setProduct] = useState([]);

  const noDupl = (array) => {
    return array.filter((val, idx, arr) => arr.findIndex((val2) => val2.id === val.id) === idx);
  };

  const fetchProduct = async () => {
    try {
      const responseId = await fetch('http://api.valantis.store:40000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': xAuth,
        },
        body: JSON.stringify({ action: 'get_ids', params: { offset: 0, limit: 50 } }),
      }).then((res) => res.json());

      await fetch('http://api.valantis.store:40000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': xAuth,
        },
        body: JSON.stringify({
          action: 'get_items',
          params: { ids: responseId.result },
        }),
      })
        .then((res) => res.json())
        .then((data) => setProduct(noDupl(data.result)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {product.map((item) => (
        <div key={item.id}>{item.id}</div>
      ))}
    </div>
  );
};

export default App;
