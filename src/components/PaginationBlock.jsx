import React from 'react';
import { Pagination, Flex } from 'antd';

const PaginationBlock = ({ amountProduct, currentPage, setCurrentPage }) => {
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <Flex style={{ marginTop: 30 }} align="center" justify="center">
      <Pagination
        pageSize={50}
        showSizeChanger={false}
        defaultCurrent={currentPage}
        total={amountProduct}
        onChange={handlePagination}
      />
    </Flex>
  );
};

export default PaginationBlock;
