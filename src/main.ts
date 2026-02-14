import './scss/styles.scss';
import { Buyer } from './components/Models/Buyer'
import { Catalog } from './components/Models/Catalog'
import { Cart } from './components/Models/Cart'

import { ServerCommunicator } from './components/Models/ServerCommunicator'

import { apiProducts } from './utils/data'
import { Api } from './components/base/Api'
import { API_URL } from './utils/constants'
import { cloneTemplate } from './utils/utils'

import { Header } from "./components/views/Header"
import { Gallery } from "./components/views/Gallery"
import { Modal } from "./components/views/Modal"
import { Basket } from "./components/views/Basket"
import { CardCatalog } from "./components/views/Card/CardCatalog"

import { EventEmitter } from "./components/base/Events";
import { CDN_URL } from './utils/constants';
import { CardPreview } from './components/views/Card/CardPreview';
import { IProduct } from './types';
import { CardBasket } from './components/views/Card/CardBasket';


// функция для текста кнопки в модальном окне с карточкой товара
function cardPreviewButtonText(selectedProduct: IProduct): string {

    if (selectedProduct.price === null) {
        return 'Недоступно'
    } else if (cart.checkPresenceOfProduct(selectedProduct.id)) {
        return 'Удалить из корзины'
    }
    
    return 'В корзину'
}

// функция рендера карточки товара в модальном окне
function renderCardPreview(product: IProduct) {
    const buttonText = cardPreviewButtonText(product);
    const clone = cloneTemplate('#card-preview');
    const card = new CardPreview(events, clone);

    modal.content = card.render({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category as "софт-скил" | "хард-скил" | "кнопка" | "дополнительное" | "другое",
        image: CDN_URL + product.image.replace(/\.svg$/i, '.png'),
        buttonText: buttonText,
        buttonIsDisabled: buttonText === 'Недоступно' ? true : false
    })
}

const apiInstance = new Api(API_URL);
const serverCommunicator = new ServerCommunicator(apiInstance)
const events = new EventEmitter()

const headerElement = document.querySelector('.header') as HTMLElement
const galleryElement = document.querySelector('.gallery') as HTMLElement
const modalWindow = document.querySelector('.modal') as HTMLElement
const basketElement = cloneTemplate('#basket') as HTMLElement

const catalog = new Catalog(events)
const cart = new Cart(events)

const gallery = new Gallery(galleryElement)
const modal = new Modal(events, modalWindow)
const header = new Header(events, headerElement)
const basket = new Basket(events, basketElement)

// генерация каталога карточек товаров
events.on('catalog:save-products-catalog', () => {
    const products = catalog.getAllProducts()

    const cards = products.map(item => {
        const clone = cloneTemplate('#card-catalog')
        const card = new CardCatalog(events, clone);

        return card.render({
            id: item.id,
            title: item.title,
            price: item.price,
            category: item.category as "софт-скил" | "хард-скил" | "кнопка" | "дополнительное" | "другое",
            image: CDN_URL + item.image.replace(/\.svg$/i, '.png')
        });
    })

    gallery.render({catalog: cards})
})

// клик на карточку в каталоге товаров
events.on('card:open', (info: { id: string }) => {
    catalog.saveProductToShow(catalog.getProductByID(info.id) ?? null)
})

// открытие модального окна с карточкой товара
events.on('catalog:selected-product-changed', () => {
    const selectedProduct = catalog.getProductToShow()

    if (selectedProduct) {
        renderCardPreview(selectedProduct)

        modal.open()
    }
})

// закрытие модального окна
events.on('modal:close', () => {
    modal.close()
})

// обработка клика по кнопке в карточке товара в модальном окне (добавление / удаление товара из корзины)
events.on('card:button-clicked', () => {
    const product = catalog.getProductToShow();
    
    if (product && !cart.checkPresenceOfProduct(product.id)) {
        cart.addProductToCart(product);
        renderCardPreview(product)
    } else if (product && cart.checkPresenceOfProduct(product.id)) {
        cart.deleteProductFromCart(product);
        renderCardPreview(product)
    }

    header.counter = cart.getAmountOfProducts()    
})

// открытие корзины
function renderBasket(products: IProduct[]) {
        
    if (cart.getAmountOfProducts() === 0) {
        modal.content = basket.render({
            productsList: [],
            totalSum: cart.getTotalPrice(),
            buttonIsDisabled: true
        })
    } else {
        const cards = products.map((item, index) => {
            const clone = cloneTemplate('#card-basket')
            const card = new CardBasket(events, clone);

            return card.render({
                id: item.id,
                index: index + 1,
                title: item.title,
                price: item.price,
            })
        })

        modal.content = basket.render({
            productsList: cards,
            totalSum: cart.getTotalPrice(),
            buttonIsDisabled: false
        })
    }
}

events.on('basket:open', () => {
    const products = cart.getProductsFromCart()
    renderBasket(products)
    
    modal.open()
})

events.on('basket:card-delete', (info: {id: string}) => {
    const products = cart.getProductsFromCart()
    const productToDelete = products.find(product => product.id === info.id)

    if (productToDelete) {
        header.counter = cart.getAmountOfProducts()
        cart.deleteProductFromCart(productToDelete)        
    }  
    
    renderBasket(cart.getProductsFromCart())
})

serverCommunicator.getProducts().then((data) => {
  catalog.saveProductsArray(data.items)
})














// // Тест каталога
// console.log('---\nТEСТ КАТАЛОГА\n---')
// const testCatalog = new Catalog();

// console.group('Тест 1: Сохранение и получение всех товаров');
// testCatalog.saveProductsArray(apiProducts.items);
// const allProducts = testCatalog.getAllProducts();
// console.table(allProducts);
// console.groupEnd();

// console.group('Тест 2: Получение товара по ID');
// const firstId = apiProducts.items[0].id;
// const foundProduct = testCatalog.getProductByID(firstId);
// const notFoundProduct = testCatalog.getProductByID('non-existent-id');

// console.log(`Ищем товар с ID: ${firstId}`);
// console.log('Результат (найден):', foundProduct);
// console.log('Результат для несуществующего ID:', notFoundProduct);
// console.groupEnd();

// console.group('Тест 3: Выбранный товар (Preview)');
// console.log('Изначально выбрано:', testCatalog.getProductToShow());

// if (foundProduct) {
//     testCatalog.saveProductToShow(foundProduct);
//     console.log('Товар для показа:', testCatalog.getProductToShow());
// }
// console.groupEnd();

// // Тест покупателя
// console.log('---\nТEСТ ПОКУПАТЕЛЯ\n---')
// const testBuyer = new Buyer();

// console.group('Тест 1. Проверка начального состояния');
//     console.log('Данные объекта:', testBuyer.getCustomerInfo());
//     console.warn('Ошибка почты:', testBuyer.checkCustomerEmail());
//     console.warn('Ошибка адреса:', testBuyer.checkCustomerAddress());
//     console.warn('Ошибка типа оплаты:', testBuyer.checkCustomerPaymentChoice());
//     console.warn('Ошибка телефона:', testBuyer.checkCustomerPhoneNumber());
// console.groupEnd();

// console.group('Тест 2. Заполнение данных покупателя');
//     testBuyer.saveEmail('hello@world.ts');
//     testBuyer.saveAddress('ул. TypeScript, д. 2026');
//     testBuyer.savePaymentType('card');
//     testBuyer.savePhoneNumber('+7 999 000-00-00');
    
//     console.log('Объект после заполнения:', testBuyer.getCustomerInfo());
// console.groupEnd();

// console.group('Тест 3. Проверка валидации');
//     const errorEmail = testBuyer.checkCustomerEmail();
//     const errorAddress = testBuyer.checkCustomerAddress();
//     const errorPaymentChoice = testBuyer.checkCustomerPaymentChoice();
//     const errorPhoneNumber = testBuyer.checkCustomerPhoneNumber();

//     console.log('Данные адреса:', errorAddress ? testBuyer.checkCustomerAddress() : 'нет ошибки');
//     console.log('Данные почты:', errorEmail ? testBuyer.checkCustomerEmail() : 'нет ошибки');
//     console.log('Данные типа оплаты:', errorPaymentChoice ? testBuyer.checkCustomerPaymentChoice() : 'нет ошибки');
//     console.log('Данные телефона:', errorPhoneNumber ? testBuyer.checkCustomerPhoneNumber() : 'нет ошибки');
// console.groupEnd();

// console.group('Тест 4. Сброс данных');
//     testBuyer.clearCustomerInfo();
//     console.log('Данные после очистки:', testBuyer.getCustomerInfo());
// console.groupEnd();


// // Тест корзины
// console.log('---\nТEСТ КОРЗИНЫ\n---')
// const testCart = new Cart()
// const [product1, product2] = apiProducts.items;

// console.log(product1)
// console.log(product2)

// console.group('Тест 1: Добавление товаров в корзину');
// testCart.addProductToCart(product1);
// testCart.addProductToCart(product2);
// console.log('Товары в корзине:', testCart.getProductsFromCart());
// console.log('Количество:', testCart.getAmountOfProducts());
// console.groupEnd();

// console.group('Тест 2: Проверка состояния корзины');
// const isPresent = testCart.checkPresenceOfProduct(product1.id);
// const totalPrice = testCart.getTotalPrice();

// console.log(`Товар "${product1.title}" в корзине:`, isPresent ? 'Да' : 'Нет');
// console.log('Общая стоимость всех товаров:', totalPrice);
// console.groupEnd();

// console.group('Тест 3: Удаление одного товара');
// console.log('Удаляем товар:', product1.title);
// testCart.deleteProductFromCart(product1);

// console.log('Осталось товаров:', testCart.getAmountOfProducts());
// console.log('Обновленная стоимость:', testCart.getTotalPrice());
// console.log('Состав корзины сейчас:', testCart.getProductsFromCart());
// console.groupEnd();

// console.group('Тест 4: Полная очистка');
// testCart.clearCart();
// console.log('Количество после очистки (ожидаем 0):', testCart.getAmountOfProducts());
// console.groupEnd();


// // Тест сервера
// console.log('---\nТEСТ СЕРВЕРА\n---')
// const apiInstance = new Api(API_URL);
// const testServerCommunicator = new ServerCommunicator(apiInstance)

// testServerCommunicator.getProducts()
//   .then(products => {
//     catalog.saveProductsArray(products.items);
//     console.log('Товары с сервера:');
//     console.table(catalog.getAllProducts())
//   })
//   .catch(error => {
//     console.error('Ошибка при получении товаров:', error);
//   });