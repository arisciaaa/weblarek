import { IBuyer, TPayment } from '../../types/index';
import { EventEmitter } from "../base/Events";

export class Buyer {
  protected paymentType: TPayment = '';
  protected email: string = '';
  protected phoneNumber: string = '';
  protected address: string = '';

  constructor(private events: EventEmitter) {
  }
  
  savePaymentType(paymentType: TPayment): void{
    this.paymentType = paymentType
    this.events.emit('payment:change', {paymentType: this.paymentType})
  }

  saveAddress(address: string): void {
    this.address = address
    this.events.emit('address:change', {address: this.address})
  }

  savePhoneNumber(phoneNumber: string): void {
    this.phoneNumber = phoneNumber
    this.events.emit('phone:change', {phoneNumber: this.phoneNumber})
  }

  saveEmail(email: string): void {
    this.email = email
    this.events.emit('email:change', {email: this.email})
  }

  getCustomerInfo(): IBuyer {
    return {
      paymentType: this.paymentType,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address
    }
  }

  clearCustomerInfo(): void {
    this.paymentType = ''
    this.email = ''
    this.phoneNumber = ''
    this.address = ''

    this.events.emit('customerInfo:clear')
  }

  checkCustomerPaymentChoice(): null | string {
    if (!this.paymentType) {
      return 'Не выбран вид оплаты'
    }

    return null
  }

  checkCustomerAddress(): null | string {
    if (!this.address) {
      return 'Не введён адрес доставки'
    }

    return null
  }

  checkCustomerPhoneNumber(): null | string {
    if (!this.phoneNumber) {
      return 'Не введён номер телефона'
    }

    return null
  }

  checkCustomerEmail(): null | string {
    if (!this.email) {
      return 'Не введён адрес электронной почты'
    }

    return null
  }
}