export const MockStoreCatalogRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn()
    };
};
