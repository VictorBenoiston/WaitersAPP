import { Order } from '../../types/Order';

import { useEffect } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import closeIcon from '../../assets/images/close-icon.svg';

import { ModalBody, Overlay, OrderDetails, Actions } from "./orderModal.styles";



interface OrderModalProps {
    order: Order | null;
    onClose: () => void;
    onDeleteOrder: () => void;
    isLoading: boolean;
    onChangeOrderStatus: () => void;
}



const OrderModal = ({ order,
    onClose,
    onDeleteOrder,
    isLoading,
    onChangeOrderStatus
}: OrderModalProps) => {

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!order) {
        return null;
    }

    const total = order.products.reduce((total, { product, quantity }) => {
        return total += (product.price * quantity);
    }, 0);



    return (
        <Overlay>
            <ModalBody>
                <header>
                    <strong>Mesa {order.table}</strong>
                    <button type="button" onClick={onClose} className='closeButton'>
                        <img src={closeIcon} alt="close icon" />
                    </button>
                </header>

                <div className="status-container">
                    <small>Status do pedido</small>
                    <div>
                        <span>
                            {order.status === 'WAITING' && '🕒'}
                            {order.status === 'IN_PRODUCTION' && '👨🏼‍🍳'}
                            {order.status === 'DONE' && '✅'}
                        </span>
                        <strong>
                            {order.status === 'WAITING' && 'Fila de espera'}
                            {order.status === 'IN_PRODUCTION' && 'Em preparação'}
                            {order.status === 'DONE' && 'Pronto!'}
                        </strong>
                    </div>
                </div>

                <OrderDetails>
                    <strong>Itens</strong>

                    <div className="order-items">
                        {order.products.map(({ _id, product, quantity }) => (
                            <div
                                key={_id}
                                className='item'>
                                <img
                                    src={`http://localhost:3002/uploads/${product.imagePath}`}
                                    alt={product.name}
                                />

                                <span className="quantity">{quantity}x</span>

                                <div className="product-details">
                                    <strong>{product.name}</strong>
                                    <span>{formatCurrency(product.price)}</span>
                                </div>


                            </div>
                        ))}
                    </div>

                    <div className='total'>
                        <span>Total</span>
                        <strong>{formatCurrency(total)}</strong>
                    </div>

                </OrderDetails>

                <Actions>
                    {order.status !== 'DONE' && (
                        <button
                            className='primary'
                            disabled={isLoading}
                            onClick={onChangeOrderStatus}>
                            {order.status === 'WAITING' ? (
                                <>
                                    <span>👨🏼‍🍳</span>
                                    <strong>Iniciar Produção</strong>
                                </>
                            ) : (
                                <>
                                    <span>✅</span>
                                    <strong>Concluir Pedido</strong>
                                </>
                            )}

                        </button>
                    )}
                    <button
                        className='secundary'
                        onClick={onDeleteOrder}
                        disabled={isLoading}>
                        Cancelar pedido
                    </button>
                </Actions>
            </ModalBody>

        </Overlay>

    );
};

export default OrderModal;
