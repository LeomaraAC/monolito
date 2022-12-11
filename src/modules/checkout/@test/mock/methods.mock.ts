const MockValidateProducts = (usecase: any) => jest.spyOn(usecase, 'validateProducts');
const MockGetProduct = (usecase: any) => jest.spyOn(usecase, 'getProduct');

export {
    MockValidateProducts,
    MockGetProduct
};
