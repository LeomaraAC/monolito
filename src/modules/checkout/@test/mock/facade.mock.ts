const MockClientFacade = () => {
    return {
        find: jest.fn(),
        add: jest.fn()
    };
};

const MockProductFacade = () => {
    return {
        checkStock: jest.fn()
    };
};

const MockCatalogFacade = () => {
    return {
        find: jest.fn()
    };
};

const MockPaymentFacade = () => {
    return {
        process: jest.fn()
    };
};

const MockInvoiceFacade = () => {
    return {
        generate: jest.fn(),
        find: jest.fn()
    };
};

export {
    MockClientFacade,
    MockProductFacade,
    MockCatalogFacade,
    MockPaymentFacade,
    MockInvoiceFacade
};
