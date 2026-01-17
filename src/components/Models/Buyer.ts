import { IBuyer, TPayment } from '../../types/index';

export class Buyer {
  protected paymentType: TPayment = '';
  protected email: string = '';
  protected phoneNumber: string = '';
  protected address: string = '';
  
  savePaymentType(paymentType: TPayment): void{
    this.paymentType = paymentType
  }

  saveAddress(address: string): void {
    this.address = address
  }

  savePhoneNumber(phoneNumber: string): void {
    this.phoneNumber = phoneNumber
  }

  saveEmail(email: string): void {
    this.email = email
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