import { useEffect, useState } from 'react';
import socketIo, { io } from 'socket.io-client';

import { Order } from '../../types/Order';

import { api } from '../../utils/api';
import OrdersBoard from '../ordersBoard/ordersBoard.component';


import { OrdersContainer } from './orders.styles';


const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    // useEffect(() => {
    //     const socket = io('ws://localhost:3002', {transports: ['websocket']});


    //     socket.on('orders@new', () => {
    //         console.log('Novo pedido cadastrado no banco de dados.');
    //     });
    // }, []);

    useEffect(() => {
        api.get('/orders')
            .then((response) => setOrders(response.data));
    }, [orders]);



    const waiting = orders.filter((order) => order.status === 'WAITING');
    const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
    const done = orders.filter((order) => order.status === 'DONE');

    function handleCancelOrder(orderId: string) {
        setOrders((prevState) => prevState.filter(order => order._id != orderId));
    }

    function handleOrderStatusChange(orderId: string, status: Order['status']) {
        setOrders((prevState) => prevState.map((order) => (
            order._id === orderId
                ? { ...order, status }
                : order
        )));
    }


    return (
        <OrdersContainer>
            <OrdersBoard
                title='Fila de espera'
                icon='🕒' orders={waiting}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange} />
            <OrdersBoard
                title='Em produção'
                icon='👨🏼‍🍳'
                orders={inProduction}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange} />
            <OrdersBoard
                title='Pronto'
                icon='✅'
                orders={done}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange} />
        </OrdersContainer>
    );
};

export default Orders;