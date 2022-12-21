import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/Cart';
import { Product } from '../../types/Product';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../button/button.component';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../order-confirmed-modal/order-confirmed-modal.component';
import { Text } from '../Text';
import { Actions, Image, Item, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from './cart.styles';

interface CartProps {
    cartItems: CartItem[];
    onAdd: (product: Product) => void;
    onRemove: (product: Product) => void;
    onConfirmOrder: () => void;
    selectedTable: string
}

export const Cart = ({ cartItems, onAdd, onRemove, onConfirmOrder, selectedTable }: CartProps) => {
    const [isLoading, setIsloading] = useState(false);
    const [isOrderConfirmedModalVisible, setIsOrderConfirmedModalVisible] = useState(false);

    const total = cartItems.reduce((total, current) => {
        return total + (current.quantity * current.product.price);
    }, 0);


    async function handleConfirmOrder() {
        setIsloading(true);
        const payload = {
            table: selectedTable,
            products: cartItems.map((cartItem) => ({
                product: cartItem.product._id,
                quantity: cartItem.quantity,
            }))
        };


        await api.post('/orders', payload);
        setIsOrderConfirmedModalVisible(true);
        setIsloading(false);

    }

    function handleOrderClose(){
        setIsOrderConfirmedModalVisible(false);
        onConfirmOrder();
    }


    return ( 
        <>
        <OrderConfirmedModal
        visible={isOrderConfirmedModalVisible}
        onOk={handleOrderClose}/>
            {cartItems.length > 0 && (
                <FlatList
                    data={cartItems}
                    keyExtractor={cartItem => cartItem.product._id}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20, maxHeight: 150 }}
                    renderItem={({ item: cartItem }) => (
                        <Item>
                            <ProductContainer>
                                <Image
                                    source={{
                                        uri: `http://192.168.0.17:3002/uploads/${cartItem.product.imagePath}`
                                    }}
                                />
                                <QuantityContainer>
                                    <Text size={14} color='#666'>{cartItem.quantity}x</Text>
                                </QuantityContainer>
                                <ProductDetails>
                                    <Text size={14} weight='600'>{cartItem.product.name}</Text>
                                    <Text size={14} color='#666' style={{ marginTop: 4 }}>{formatCurrency(cartItem.product.price)}</Text>
                                </ProductDetails>
                            </ProductContainer>
                            <Actions>
                                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => onAdd(cartItem.product)}>
                                    <PlusCircle />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => onRemove(cartItem.product)}>
                                    <MinusCircle />
                                </TouchableOpacity>
                            </Actions>
                        </Item>
                    )}
                />
            )}
            <Summary>
                <TotalContainer>
                    {cartItems.length > 0 ? (
                        <>
                            <Text color='#666'>Total</Text>
                            <Text size={20} weight='600'>{formatCurrency(total)}</Text></>
                    ) : (
                        <Text color='#999'>Seu carrinho está vazio</Text>
                    )}
                </TotalContainer>

                <Button 
                onPress={handleConfirmOrder} 
                disabled={cartItems.length === 0}
                loading={isLoading}
                >Confirmar Pedido</Button>
            </Summary>

        </>
    );
};

