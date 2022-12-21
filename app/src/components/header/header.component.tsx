import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './header.styles';


interface HeaderProps {
    selectedTable: string;
    onCancelOrder: () => void;
}

export const Header = ({ selectedTable, onCancelOrder }: HeaderProps) => {
    return (
        <Container>
            {!selectedTable && (
                <>
                    <Text size={14} opacity={0.9}>Bem vindo(a) ao</Text>
                    <Text size={24} weight='700'>WAITER
                        <Text size={24} weight='400'>
                            APP
                        </Text>
                    </Text>
                </>
            )}

            {selectedTable && (
                <Content>
                    <OrderHeader>
                        <Text size={24} weight='600'>Pedido</Text>
                        <TouchableOpacity onPress={onCancelOrder}>
                            <Text
                                color='#D73035'
                                weight='600'
                                size={14}>Cancelar Pedido</Text>
                        </TouchableOpacity>
                    </OrderHeader>

                    <Table>
                        <Text color='#666'>Table {selectedTable}</Text>
                    </Table>
                </Content>
            )}
        </Container>
    );

};
