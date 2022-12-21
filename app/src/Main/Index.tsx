import { ActivityIndicator } from 'react-native';

import { Header } from '../components/header/header.component';
import { Categories } from '../components/categories/categories.component';
import { Menu } from '../components/menu/menu.component';
import { Button } from '../components/button/button.component';
import { TableModal } from '../components/table-modal/table-modal.components';
import { useEffect, useState } from 'react';
import { Cart } from '../components/cart/cart.component';
import { CartItem } from '../types/Cart';
import { Product } from '../types/Product';

import { api } from '../utils/api';

import {
    Container,
    CategoriesContainer,
    MenuContainer,
    Footer,
    FooterContaioner,
    CenteredContainer
} from './styles';
import { Text } from '../components/Text';
import { Empty } from '../components/Icons/Empty';
import { Category } from '../types/Category';


export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    useEffect(() => {
        try {
            Promise.all([
                api.get('/categories'),
                api.get('/products')
            ]).then((([categoriesResponse, productsResponse]) => {
                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
                setIsLoading(false);
            }));
        } catch (err) {
            console.log('error', err);
        }

    }, []);

    async function handleSelectCategory(categoryId: string) {
        const route = !categoryId
            ? 'products'
            : `/categories/${categoryId}/products`;

        setIsLoadingProducts(true);

        const { data } = await api.get(route);
        setProducts(data);
        setIsLoadingProducts(false);

    }


    function handleSaveTable(table: string) {
        setSelectedTable(table);
    }

    function handleResetOrder() {
        setSelectedTable('');
        setCartItems([]);
    }

    function handleAddToCart(product: Product) {
        if (!selectedTable) {
            setIsTableModalVisible(true);
        }

        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                cartItem => cartItem.product._id === product._id
            );

            if (itemIndex < 0) {
                return prevState.concat({
                    quantity: 1,
                    product
                });
            }

            const newCartItems = [...prevState];
            const item = newCartItems[itemIndex];

            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity + 1
            };

            return newCartItems;
        });
    }

    function handleRemoveItem(product: Product) {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                cartItem => cartItem.product._id === product._id
            );

            const item = prevState[itemIndex];
            const newCartItems = [...prevState];

            if (item.quantity === 1) {
                newCartItems.splice(itemIndex, 1);

                return newCartItems;
            }

            newCartItems[itemIndex] = {
                ...item,
                quantity: item.quantity - 1,
            };

            return newCartItems;
        });
    }

    return (
        <>
            <Container>
                <Header
                    selectedTable={selectedTable}
                    onCancelOrder={handleResetOrder}
                />

                {isLoading ? (
                    <CenteredContainer>
                        <ActivityIndicator color='#D73035' size='large' />
                    </CenteredContainer>

                ) : (
                    <>
                        <CategoriesContainer>
                            <Categories
                                onSelectCategory={handleSelectCategory}
                                categories={categories} />
                        </CategoriesContainer>

                        {isLoadingProducts ? (
                            <CenteredContainer>
                                <ActivityIndicator color='#D73035' size='large' />
                            </CenteredContainer>
                        ) : (
                            <>
                                {
                                    products.length > 0 ? (
                                        <MenuContainer>
                                            <Menu
                                                onAddToCart={handleAddToCart}
                                                products={products} />
                                        </MenuContainer>
                                    ) : (
                                        <CenteredContainer>
                                            <Empty />
                                            <Text
                                                color='#666'
                                                style={{ marginTop: 24 }}
                                            >Nenhum produto foi encontrado!</Text>
                                        </CenteredContainer>
                                    )
                                }
                            </>
                        )}
                    </>
                )}

            </Container>

            <Footer>

                <FooterContaioner>
                    {!selectedTable && (
                        <Button
                            onPress={() => setIsTableModalVisible(true)}
                            disabled={isLoading}>
                            Novo Pedido
                        </Button>
                    )}

                    {selectedTable && (
                        <Cart
                            cartItems={cartItems}
                            onAdd={handleAddToCart}
                            onRemove={handleRemoveItem}
                            onConfirmOrder={handleResetOrder}
                            selectedTable={selectedTable}
                        />
                    )}
                </FooterContaioner>

            </Footer>

            <TableModal
                visible={isTableModalVisible}
                onClose={() => setIsTableModalVisible(false)}
                onSave={handleSaveTable} />

        </>

    );
}

