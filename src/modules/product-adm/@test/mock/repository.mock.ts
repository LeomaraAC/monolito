export const MockProductRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    };
};
