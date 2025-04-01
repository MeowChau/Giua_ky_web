import React, { useState } from 'react';
import { Select, Card, Input, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { Product } from '../../../models/types';

interface ProductSelectProps {
  selectedProducts: Product[];
  setSelectedProducts: (products: Product[]) => void;
}

const ProductSelect: React.FC<ProductSelectProps> = ({
  selectedProducts,
  setSelectedProducts,
}) => {
  const [productSearch, setProductSearch] = useState('');
  const sampleProducts: Product[] = [
    { id: '1', name: 'Product 1', price: 100, quantity: 10 },
    { id: '2', name: 'Product 2', price: 200, quantity: 5 },
    { id: '3', name: 'Product 3', price: 300, quantity: 8 },
  ];

  const handleProductSelect = (productId: string) => {
    const product = sampleProducts.find((p) => p.id === productId);
    if (product && !selectedProducts.some((p) => p.id === productId)) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map((p) => (p.id === productId ? { ...p, quantity } : p))
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  return (
    <>
      <Select
        showSearch
        placeholder="Tìm kiếm sản phẩm"
        value={null}
        onChange={handleProductSelect}
        onSearch={setProductSearch}
        filterOption={(input, option) =>
          typeof option?.children === 'string' && (option.children as string).toLowerCase().includes(input.toLowerCase())
        }
        style={{ width: '100%', marginBottom: 16 }}
      >
        {sampleProducts
          .filter(
            (product) =>
              !selectedProducts.some((p) => p.id === product.id) &&
              product.name.toLowerCase().includes(productSearch.toLowerCase())
          )
          .map((product) => (
            <Select.Option key={product.id} value={product.id}>
              {product.name} - {product.price.toLocaleString()} VND
            </Select.Option>
          ))}
      </Select>

      <div style={{ marginBottom: 16 }}>
        {selectedProducts.map((product) => (
          <Card
            key={product.id}
            size="small"
            style={{ marginBottom: 8 }}
            actions={[
              <Input
                key={`${product.id}-input`}
                type="number"
                min={1}
                value={product.quantity}
                onChange={(e) =>
                  handleQuantityChange(product.id, parseInt(e.target.value) || 1)
                }
                style={{ width: 60 }}
              />,
              <Button
                key={`${product.id}-button`}
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveProduct(product.id)}
              />,
            ]}
          >
            <Card.Meta
              title={`${product.name} - ${product.price.toLocaleString()} VND`}
              description={`Số lượng: ${product.quantity}`}
            />
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductSelect;