import React from 'react';
import { Card, Typography } from 'antd';

const CardItem = ({ brand, id, price, product }) => {
  return (
    <Card
      size="small"
      title={product}
      style={{
        width: 350,
        backgroundColor: '#b5e3e8',
      }}>
      <Typography.Paragraph>id: {id}</Typography.Paragraph>
      <Typography.Paragraph>Цена: {price} руб.</Typography.Paragraph>
      <Typography.Paragraph>Бренд: {brand || '-'}</Typography.Paragraph>
    </Card>
  );
};

export default CardItem;
