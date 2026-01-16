import './scss/styles.scss';
import { Buyer } from './components/base/Models/Buyer'
import { Catalog } from './components/base/Models/Catalog'
import { Cart } from './components/base/Models/Cart'
import { ServerCommunicator } from './components/base/Models/ServerCommunicator'
import { apiProducts } from './utils/data'
import { Api } from './components/base/Api'

// Тест каталога
console.log('---\nТEСТ КАТАЛОГА\n---')
const testCatalog = new Catalog();

console.group('Тест 1: Сохранение и получение всех товаров');
testCatalog.saveProductsArray(apiProducts.items);
const allProducts = testCatalog.getAllProducts();
console.table(allProducts);
console.groupEnd();

console.group('Тест 2: Получение товара по ID');
const firstId = apiProducts.items[0].id;
const foundProduct = testCatalog.getProductByID(firstId);
const notFoundProduct = testCatalog.getProductByID('non-existent-id');

console.log(`Ищем товар с ID: ${firstId}`);
console.log('Результат (найден):', foundProduct);
console.log('Результат для несуществующего ID:', notFoundProduct);
console.groupEnd();

console.group('Тест 3: Выбранный товар (Preview)');
console.log('Изначально выбрано:', testCatalog.getProductToShow());

if (foundProduct) {
    testCatalog.saveProductToShow(foundProduct);
    console.log('Товар для показа:', testCatalog.getProductToShow());
}
console.groupEnd();

// Тест покупателя
console.log('---\nТEСТ ПОКУПАТЕЛЯ\n---')
const testBuyer = new Buyer();

console.group('Тест 1. Проверка начального состояния');
    console.log('Данные объекта:', testBuyer.getCustomerInfo());
    console.warn('Ошибка почты:', testBuyer.checkCustomerEmail());
    console.warn('Ошибка адреса:', testBuyer.checkCustomerAddress());
    console.warn('Ошибка типа оплаты:', testBuyer.checkCustomerPaymentChoice());
    console.warn('Ошибка телефона:', testBuyer.checkCustomerPhoneNumber());
console.groupEnd();

console.group('Тест 2. Заполнение данных покупателя');
    testBuyer.saveEmail('hello@world.ts');
    testBuyer.saveAddress('ул. TypeScript, д. 2026');
    testBuyer.savePaymentType('card');
    testBuyer.savePhoneNumber('+7 999 000-00-00');
    
    console.log('Объект после заполнения:', testBuyer.getCustomerInfo());
console.groupEnd();

console.group('Тест 3. Проверка валидации');
    const errorEmail = testBuyer.checkCustomerEmail();
    const errorAddress = testBuyer.checkCustomerAddress();
    const errorPaymentChoice = testBuyer.checkCustomerPaymentChoice();
    const errorPhoneNumber = testBuyer.checkCustomerPhoneNumber();

    console.log('Данные адреса:', errorAddress ? testBuyer.checkCustomerAddress() : 'нет ошибки');
    console.log('Данные почты:', errorEmail ? testBuyer.checkCustomerEmail() : 'нет ошибки');
    console.log('Данные типа оплаты:', errorPaymentChoice ? testBuyer.checkCustomerPaymentChoice() : 'нет ошибки');
    console.log('Данные телефона:', errorPhoneNumber ? testBuyer.checkCustomerPhoneNumber() : 'нет ошибки');
console.groupEnd();

console.group('Тест 4. Сброс данных');
    testBuyer.clearCustomerInfo();
    console.log('Данные после очистки:', testBuyer.getCustomerInfo());
console.groupEnd();


// Тест корзины
console.log('---\nТEСТ КОРЗИНЫ\n---')
const testCart = new Cart()
const [product1, product2] = apiProducts.items;

console.log(product1)
console.log(product2)

console.group('Тест 1: Добавление товаров в корзину');
testCart.addProductToCart(product1);
testCart.addProductToCart(product2);
console.log('Товары в корзине:', testCart.getProductsFromCart());
console.log('Количество:', testCart.getAmountOfProducts());
console.groupEnd();

console.group('Тест 2: Проверка состояния корзины');
const isPresent = testCart.checkPresenceOfProduct(product1.id);
const totalPrice = testCart.getTotalPrice();

console.log(`Товар "${product1.title}" в корзине:`, isPresent ? 'Да' : 'Нет');
console.log('Общая стоимость всех товаров:', totalPrice);
console.groupEnd();

console.group('Тест 3: Удаление одного товара');
console.log('Удаляем товар:', product1.title);
testCart.deleteProductFromCart(product1);

console.log('Осталось товаров:', testCart.getAmountOfProducts());
console.log('Обновленная стоимость:', testCart.getTotalPrice());
console.log('Состав корзины сейчас:', testCart.getProductsFromCart());
console.groupEnd();

console.group('Тест 4: Полная очистка');
testCart.clearCart();
console.log('Количество после очистки (ожидаем 0):', testCart.getAmountOfProducts());
console.groupEnd();


// Тест сервера
console.log('---\nТEСТ СЕРВЕРА\n---')
const apiInstance = new Api(`${import.meta.env.VITE_API_ORIGIN}/api/weblarek`);
const testServerCommunicator = new ServerCommunicator(apiInstance)

testServerCommunicator.getProducts()
  .then(products => {
    testCatalog.products = products;
    console.log('Товары с сервера:', products);
  })
  .catch(error => {
    console.error('Ошибка при получении товаров:', error);
  });
