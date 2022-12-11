const MockCheckoutRepository = () => {
    return {
        addOrder: jest.fn(),
        findOrder: jest.fn()
    };
};
export {
    MockCheckoutRepository
};
