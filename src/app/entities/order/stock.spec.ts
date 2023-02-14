import { Stock } from "./stock";

describe('Stock', () => {
    it('it should be able to create a stock', () => {
        const content = new Stock({
            name: "playstation",
            category: "videogame",
            description: "novo",
            price: 1500,
            quantity: 2
        });

        expect(content).toBeTruthy();
    });
});
