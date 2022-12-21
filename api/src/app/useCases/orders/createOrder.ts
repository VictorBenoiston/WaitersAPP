import { Request, Response } from 'express';
// import { io } from '../../..';

import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response){
    try{
        const { table, products } = req.body;
        
        const order = await Order.create({ table, products });

        // io.emit('orders@new');

        res.status(201).json(order);
    }catch(err){
        console.log(err);
    }
}
