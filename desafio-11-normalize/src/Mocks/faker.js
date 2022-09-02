import { faker } from '@faker-js/faker';

faker.locale = 'es';

const {commerce, image, datatype} = faker;

let testProducts = [];

const productsMock = () => {
    for (let i=1; i<5; i++){
        testProducts.push({
            nombre: commerce.product(),
            precio: commerce.price(),
            foto: image.imageUrl(),
            id: datatype.uuid()
        })
    };
    return testProducts;
}

export   const productos = productsMock();