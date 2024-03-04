import { Alert, Flex, Select, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import React from 'react';
import { fetchDataProduct, fetchFilterBrand, fetchFilterPrice, fetchFilterTitle } from '../API';
import { deleteDuplicates } from '../utils';

const FilterBlock = ({
  select,
  setSelect,
  setAmountProduct,
  setSearchValue,
  setLoading,
  setProduct,
  searchValue,
}) => {
  const handleFilter = (value) => {
    setSelect(value);
  };

  const fetchFilterProduct = async (value) => {
    setLoading(true);

    const fetchDataFilterProduct = (data) => {
      fetchDataProduct(data)
        .then((data) => {
          setAmountProduct(0);
          setProduct(deleteDuplicates(data.result));
        })
        .then(() => setLoading(false));
    };

    try {
      switch (select) {
        case 'title':
          fetchFilterTitle(value).then((data) => {
            fetchDataFilterProduct(data);
          });
          break;
        case 'price':
          fetchFilterPrice(value).then((data) => {
            fetchDataFilterProduct(data);
          });
          break;
        case 'brand':
          fetchFilterBrand(value).then((data) => {
            fetchDataFilterProduct(data);
          });
          break;

        default:
          setLoading(false);
          break;
      }
    } catch (error) {
      <Alert message="При загрузке данных произошла ошибка" type="error" showIcon />;
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    fetchFilterProduct(value);
  };

  return (
    <Flex style={{ marginBottom: 20 }} justify="flex-start" align="center" gap="middle">
      <Typography.Title level={4}>Поиск по: </Typography.Title>
      <Select
        size="default"
        defaultValue="title"
        onChange={(data) => handleFilter(data)}
        style={{
          width: 120,
        }}
        options={[
          {
            value: 'title',
            label: 'Названию',
          },
          {
            value: 'price',
            label: 'Цене',
          },
          {
            value: 'brand',
            label: 'Бренду',
          },
        ]}
      />
      <Search
        defaultValue={searchValue}
        onSearch={(data) => handleSearch(data)}
        style={{ width: 300 }}
        placeholder={
          select === 'title'
            ? 'Введите название'
            : select === 'price'
            ? 'Введите цену'
            : 'Введите бренд'
        }
        enterButton
      />
    </Flex>
  );
};

export default FilterBlock;
