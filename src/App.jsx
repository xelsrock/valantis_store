import React, { useState, useEffect } from 'react';
import { deleteDuplicates } from './utils';
import { xAuth } from './API';
import CardItem from './components/CardItem';

import './App.css';

import { Flex, Spin, Alert, Layout } from 'antd';
import PaginationBlock from './components/PaginationBlock';

const App = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProduct = async () => {
    setLoading(true);

    try {
      const responseId = await fetch('http://api.valantis.store:40000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': xAuth,
        },
        body: JSON.stringify({
          action: 'get_ids',
          params: { offset: (currentPage - 1) * 50, limit: 50 },
        }),
      })
        .then((res) => res.json())
        .catch(() => setLoading(false));

      return await fetch('http://api.valantis.store:40000/', {
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
        .then((data) => setProduct(deleteDuplicates(data.result)))
        .finally(() => setLoading(false));
    } catch (error) {
      <Alert message="При загрузке данных произошла ошибка" type="error" showIcon />;
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [currentPage]);

  return (
    <Layout style={{ padding: 40, backgroundColor: 'inherit', margin: '0 auto' }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          {product.length ? (
            <Flex wrap="wrap" gap="middle" align="center" justify="center">
              {product.map((item) => (
                <CardItem key={item.id} {...item} />
              ))}
            </Flex>
          ) : (
            <Alert message="При загрузке данных произошла ошибка" type="error" showIcon />
          )}

          <PaginationBlock currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
      )}
    </Layout>
  );
};

export default App;
