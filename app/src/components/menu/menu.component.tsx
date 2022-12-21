import { Text } from '../Text';
import { FlatList } from 'react-native';
import { formatCurrency } from '../../utils/formatCurrency';

import { ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton } from './menu.styles';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../product-modal/product-modal.component';
import { useState } from 'react';
import { Product } from '../../types/Product';

interface MenuProps {
    onAddToCart: (pruduct: Product) => void;
    products:Product[];
}

export const Menu = ({ onAddToCart, products }: MenuProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

    function handleOpenModal(product: Product) {
        setIsModalVisible(true);
        setSelectedProduct(product);
    }
    return (
        <>
            <ProductModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                product={selectedProduct}
                onAddToCart={onAddToCart}
            />

            <FlatList
                data={products}
                style={{ marginTop: 32 }}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                keyExtractor={product => product._id}
                ItemSeparatorComponent={Separator}
                renderItem={({ item: product }) => (
                    <ProductContainer onPress={() => handleOpenModal(product)}>
                        <ProductImage source={{
                            uri: `http://192.168.0.17:3002/uploads/${product.imagePath}`
                        }} />
                        <ProductDetails>
                            <Text weight='600'>{product.name}</Text>
                            <Text color='#666' size={14} style={{ marginVertical: 8 }}>
                                {product.description}
                            </Text>
                            <Text size={14} weight='600'>{formatCurrency(product.price)}</Text>
                        </ProductDetails>

                        <AddToCartButton onPress={() => onAddToCart(product)}>
                            <PlusCircle />
                        </AddToCartButton>
                    </ProductContainer>)}
            />

        </>
    );
};

