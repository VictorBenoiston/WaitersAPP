import styled from "styled-components";

export const Overlay = styled.div`
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4.5px);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalBody = styled.div`
    background: #fff;
    width: 480px;
    border-radius: 8px;
    padding: 32px;

    .closeButton {
        transition: 0.4s;
        &:hover{
            transform: scale(1.3);
        }
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* padding: 0; */


        strong {
            font-size: 24px;
        }

        button {
        border: 0;
        background-color: transparent;
        display: flex;
        

    }
    }

    .status-container {
        margin-top: 32px;
        small {
            font-size: 14px;
            opacity: 0.8;
        }

        div {
            align-items: center;
            display: flex;
            gap: 8px;
            margin-top: 8px;
        }

    }

`;

export const OrderDetails = styled.div`
    margin-top: 32px;

    > strong {
    font-weight: 500;
    font-size: 14px;
    opacity: 0.8;
    }
    .order-items{
        margin-top: 16px;

        .item {
            display: flex;

            & + .item {
                margin-top: 16px;
            }

            img {
                width: 56px;
                height:28.51px;
                border-radius: 6px;
            }

            .quantity {
                font-size: 14px;
                color: #666;
                display: block;
                min-width: 20px;
                margin-left: 12px;
            }
        }

        .product-details {
            margin-left: 4px;

            strong{
                margin-bottom: 4px;
                display: block;
            }

            span {
                font-size: 14px;
                color: #666
            }
        }
    }

    .total {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;

        span {
            font-weight: 500;
            font-size: 14px;
            opacity: 0.8;
        }
        
    }
`;


export const Actions = styled.footer`
    display: flex;
    flex-direction: column;
    margin-top: 32px;

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .primary {
        background: #333;
        border-radius: 48px;
        border: 0;
        color: #fff;
        padding: 12px 24px;
        display: flex;
        align-items: center;
        gap: 8px;
        justify-content: center;
    }

    .secundary {
        padding: 14px 24px;
        color: #d73035;
        font-weight: bold;
        border: 0;
        background: transparent;
        margin-top: 12px;

    }

`;


