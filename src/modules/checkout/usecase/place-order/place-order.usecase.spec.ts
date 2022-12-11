import PlaceOrderUsecase from './place-order.usecase';
import {PlaceOrderInputDto} from './place-order.dto';
import {
    MockCatalogFacade,
    MockClientFacade,
    MockInvoiceFacade,
    MockPaymentFacade,
    MockProductFacade
} from '../../@test/mock/facade.mock';
import Product from '../../domain/product.entity';
import Id from '../../../@shared/domain/value-object/id.value-object';
import {MockCheckoutRepository} from '../../@test/mock/repository.mock';
import {MockGetProduct, MockValidateProducts} from '../../@test/mock/methods.mock';

const mockDate = new Date(2022,12,7);

describe('Place order use case unit test', () => {
    describe('execute method', () => {
        beforeAll(() => {
            // @ts-ignore
            jest.useFakeTimers('modern');
            jest.setSystemTime(mockDate);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it('should throw an error when client not found', async () => {
            const mockClientFacade = MockClientFacade();
            mockClientFacade.find.mockResolvedValue(null);
            // @ts-expect-error - no params in constructor
            const usecase = new PlaceOrderUsecase();

            // @ts-expect-error - force set clientFacade
            usecase._clientFacade = mockClientFacade;

            await expect(usecase.execute({clientId: '0', products: []}))
                .rejects.toThrow(new Error('Client 0 not found'));
            await expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
            await expect(mockClientFacade.find).toHaveBeenCalledWith({id: '0'});
        });

        it('should throw an error when products are not valid', async () => {
            const mockClientFacade = MockClientFacade();
            mockClientFacade.find.mockResolvedValue(true);
            // @ts-expect-error - no params in constructor
            const usecase = new PlaceOrderUsecase();

            const mockValidateProducts = MockValidateProducts(usecase);
            mockValidateProducts.mockRejectedValue(new Error('No product selected'));

            // @ts-expect-error - force set clientFacade
            usecase._clientFacade = mockClientFacade;
            const input: PlaceOrderInputDto = {clientId: '1', products: []};

            await expect(usecase.execute(input))
                .rejects.toThrow(new Error('No product selected'));
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
            expect(mockValidateProducts).toHaveBeenCalledWith(input);
        });

        describe('place an order', () => {
            const clientProps = {
                id: '1c',
                name: 'client 0',
                document: '0000',
                email: 'client@user.com',
                street: 'some street',
                number: '1',
                complement: '',
                city: 'some city',
                state: 'some state',
                zipcode: '000'
            };
            const mockClientFacade = MockClientFacade();
            const mockPaymentFacade = MockPaymentFacade();
            const mockCheckoutRepository = MockCheckoutRepository();
            const mockInvoiceFacade = MockInvoiceFacade();

            mockClientFacade.find.mockResolvedValue(clientProps);
            mockInvoiceFacade.generate.mockResolvedValue({id: '1i'});

            const usecase = new PlaceOrderUsecase(
                mockClientFacade,
                null,
                null,
                mockCheckoutRepository,
                mockInvoiceFacade,
                mockPaymentFacade
            );

            const products = {
                '1': new Product({
                    id: new Id('1'),
                    name: 'Product 1',
                    description: 'descriprion 1',
                    salesPrice: 40
                }),
                '2': new Product({
                    id: new Id('2'),
                    name: 'Product 2',
                    description: 'descriprion 2',
                    salesPrice: 30
                })
            };
            const mockValidateProduct = MockValidateProducts(usecase);
            const mockGetProduct = MockGetProduct(usecase);
            mockValidateProduct.mockReturnValue(null);
            //  @ts-expect-error
            mockGetProduct.mockImplementation((productId: keyof typeof products) => products[productId]);

            it('should not be approved', async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transactionId: '1t',
                    orderId: '1o',
                    amount: 100,
                    status: 'error',
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                const input: PlaceOrderInputDto = {
                    clientId: clientProps.id,
                    products: [{productId: '1'}, {productId: '2'}]
                };

                const output = await usecase.execute(input);
                expect(output.invoiceId).toBeNull();
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([{productId: '1'}, {productId: '2'}]);
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({id:'1c'});
                expect(mockValidateProduct).toHaveBeenCalledTimes(1);
                expect(mockValidateProduct).toHaveBeenCalledWith(input);
                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                });
                expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0);
            });

            it('should be approved', async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transactionId: '1t',
                    orderId: '1o',
                    amount: 100,
                    status: 'approved',
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                const input: PlaceOrderInputDto = {
                    clientId: clientProps.id,
                    products: [{productId: '1'}, {productId: '2'}]
                };

                const output = await usecase.execute(input);

                expect(output.invoiceId).toBe('1i');
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([{productId: '1'}, {productId: '2'}]);
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({id:'1c'});
                expect(mockValidateProduct).toHaveBeenCalledTimes(1);
                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                });
                expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);
                expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
                    name: clientProps.name,
                    street: clientProps.street,
                    number: clientProps.number,
                    complement: clientProps.complement,
                    city: clientProps.city,
                    state: clientProps.state,
                    document: clientProps.document,
                    zipCode: clientProps.zipcode,
                    items: [{
                        id: products['1'].id.id,
                        name: products['1'].name,
                        price: products['1'].salesPrice
                    }, {
                        id: products['2'].id.id,
                        name: products['2'].name,
                        price: products['2'].salesPrice
                    }],
                });
            });
        });
    });

    describe('validateProducts method', () => {
        // @ts-expect-error - no params in constructor
        const usecase = new PlaceOrderUsecase();

        it('should throw error if no products are selected', async () => {
            const input: PlaceOrderInputDto = {clientId: '1', products: []};

            // @ts-expect-error - access private method
            await expect(usecase.validateProducts(input)).rejects.toThrow(new Error('No product selected'));
        });

        it('should thrown an error when product is out of stock', async () => {
            const mockProductFacade = MockProductFacade();
            mockProductFacade.checkStock = jest.fn(({productId}: { productId: string }) => Promise.resolve({
                productId,
                stock: productId === '1' ? 0 : 1
            }));

            // @ts-expect-error - force set clientFacade
            usecase._productFacade = mockProductFacade;
            let input: PlaceOrderInputDto = {clientId: '1', products: [{productId: '1'}]};
            // @ts-expect-error - access private method
            await expect(usecase.validateProducts(input)).rejects.toThrow(new Error('Product 1 is not available in stock'));
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(1);

            input = {clientId: '1', products: [{productId: '0'}, {productId: '1'}]};
            // @ts-expect-error - access private method
            await expect(usecase.validateProducts(input)).rejects.toThrow(new Error('Product 1 is not available in stock'));
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

            input = {clientId: '1', products: [{productId: '0'}, {productId: '1'}, {productId: '2'}]};
            // @ts-expect-error - access private method
            await expect(usecase.validateProducts(input)).rejects.toThrow(new Error('Product 1 is not available in stock'));
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);
        });
    });

    describe('getProducts method', () => {
        // @ts-expect-error - no params in constructor
        const usecase = new PlaceOrderUsecase();

        beforeAll(() => {
            // @ts-ignore
            jest.useFakeTimers('modern');
            jest.setSystemTime(mockDate);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it('should thrown an error when product not found', async () => {
            const mockCatalogFacade = MockCatalogFacade();
            mockCatalogFacade.find.mockResolvedValue(null);

            // @ts-expect-error - force set catalog facade
            usecase._catalogFacade = mockCatalogFacade;

            // @ts-expect-error - access private error
            await expect(usecase.getProduct('0')).rejects.toThrow(new Error('Product not found'));
        });

        it('should return a product', async () => {
            const productValues = {
                id: '1',
                name: 'Product 1',
                description: 'Description 1',
                salesPrice: 1
            };
            const mockCatalogFacade = MockCatalogFacade();
            mockCatalogFacade.find.mockResolvedValue(productValues);

            // @ts-expect-error - force set catalog facade
            usecase._catalogFacade = mockCatalogFacade;

            // @ts-expect-error - access private error
            const product = await usecase.getProduct(productValues.id);

            expect(product).toEqual(new Product({
                id: new Id(productValues.id),
                name: productValues.name,
                salesPrice: productValues.salesPrice,
                description: productValues.description
            }));
            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
            expect(mockCatalogFacade.find).toHaveBeenCalledWith({id: productValues.id});

        });
    });
});
