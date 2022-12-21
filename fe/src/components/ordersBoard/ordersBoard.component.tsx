import { useState } from 'react';

import { Order } from '../../types/Order';
import { api } from '../../utils/api';

import OrderModal from '../orderModal/orderModal.component';
import { toast } from 'react-toastify';

import { Board, OrdersContent } from './ordersBorad.styles';

interface OrdersBoardProps {
    icon: string;
    title: string;
    orders: Order[];
    onCancelOrder: (orderId: string) => void;
    onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

// {title: OrdersBoardProps, icon}

const OrdersBoard = ({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
    const [isLoading, setIsLoading] = useState(false);


    function handleOpenModal(order: Order) {
        setIsModalVisible(true);
        setSelectedOrder(order);
    }

    function handleCloseModal() {
        setIsModalVisible(false);
        setSelectedOrder(null);
    }

    async function handleChangeOrderStatus() {
        setIsLoading(true);

        const status = selectedOrder?.status === 'WAITING'
            ? 'IN_PRODUCTION' : 'DONE';

        await api.patch(`/orders/${selectedOrder?._id}`, { status });

        toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado!`);
        onChangeOrderStatus(selectedOrder!._id, status);
        setIsLoading(false);
        setIsModalVisible(false);
    }

    async function handleCancelOrder() {
        setIsLoading(true);

        await api.delete(`/orders/${selectedOrder?._id}`);

        toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);

        setIsLoading(false);
        setIsModalVisible(false);
        onCancelOrder(selectedOrder!._id);

    }

    return (
        <Board>
            {isModalVisible && <OrderModal
                order={selectedOrder}
                onClose={handleCloseModal}
                onDeleteOrder={handleCancelOrder}
                isLoading={isLoading}
                onChangeOrderStatus={handleChangeOrderStatus}
                 />}


            <header>
                <span>{icon}</span>
                <strong>{title}</strong>
                <span>({orders.length})</span>

            </header>

            {orders.length > 0 && (<OrdersContent>
                {orders.map((order) => (
                    <button type='button' key={order._id} onClick={() => handleOpenModal(order)}>
                        <strong>Mesa {order.table}</strong>
                        {order.products.length === 1 ? (
                            <span>{order.products.length}x Item</span>
                        ) : <span>{order.products.length}x Itens</span>}
                        
                    </button>
                ))}
            </OrdersContent>)}

        </Board>
    );
};
export default OrdersBoard;
