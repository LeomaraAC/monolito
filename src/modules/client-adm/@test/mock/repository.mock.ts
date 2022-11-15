export const MockClientRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};
