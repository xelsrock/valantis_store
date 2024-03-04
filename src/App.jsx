import React, { useState, useEffect } from 'react';
import { deleteDuplicates } from './utils';
import { fetchAllProduct, fetchDataProduct, fetchIdProduct } from './API';
import CardItem from './components/CardItem';

import './App.css';

import { Flex, Spin, Alert, Layout, Typography } from 'antd';
import PaginationBlock from './components/PaginationBlock';
import FilterBlock from './components/FilterBlock';

const App = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [amountProduct, setAmountProduct] = useState(0);

  const [select, setSelect] = useState('title');
  const [searchValue, setSearchValue] = useState('');

  const fetchProduct = async () => {
    setLoading(true);
    try {
      fetchIdProduct(currentPage).then((data) => {
        fetchDataProduct(data)
          .then((data) => setProduct(deleteDuplicates(data.result)))
          .finally(() => setLoading(false));
      });
    } catch (error) {
      <Alert message="При загрузке данных произошла ошибка" type="error" showIcon />;
    }
  };

  useEffect(() => {
    fetchAllProduct().then((data) => setAmountProduct(data.result.length));
    fetchProduct();
  }, [currentPage]);

  return (
    <Layout style={{ padding: 40, backgroundColor: 'inherit', margin: '0 auto' }}>
      <FilterBlock
        setAmountProduct={setAmountProduct}
        select={select}
        setSelect={setSelect}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        setLoading={setLoading}
        setProduct={setProduct}
      />
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          {product.length ? (
            <>
              <Flex wrap="wrap" gap="middle" align="center" justify="center">
                {product.map((item) => (
                  <CardItem key={item.id} {...item} />
                ))}
              </Flex>
              {amountProduct ? (
                <PaginationBlock
                  amountProduct={amountProduct}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              ) : (
                ''
              )}
            </>
          ) : (
            <Typography.Title level={2}>По Вашему запросу ничего не найдено</Typography.Title>
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
