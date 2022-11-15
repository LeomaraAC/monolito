export const MockInvoiceRepository = () => {
    return {
        save: jest.fn(),
        find: jest.fn(),
    };
};
