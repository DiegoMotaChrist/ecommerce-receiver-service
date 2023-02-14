import { Order } from "./order";

describe('Order', () => {
    it('it should be able to create a order', () => {
        const content = new Order({
            category: "eletrônico",
            description: "produto de qualidade",
            name: "pedido 1",
            stockIds: ['any_id|1'],
            price: 1
        });

        expect(content).toBeTruthy();
    });
});
