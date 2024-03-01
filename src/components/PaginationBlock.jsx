import React from 'react';
import { Pagination, Flex } from 'antd';

const PaginationBlock = ({ currentPage, setCurrentPage }) => {
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <Flex style={{ marginTop: 30 }} align="center" justify="center">
      <Pagination
        showSizeChanger={false}
        defaultCurrent={currentPage}
        total={500}
        onChange={handlePagination}
      />
    </Flex>
  );
};

export default PaginationBlock;
