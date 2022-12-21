import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function removeProduct(req: Request, res: Response) {
    try {
        const { productId } = req.params;

        productId ? await Product.findByIdAndDelete(productId)
            : res.status(400).json({
                error: 'No product found'
            });

        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}