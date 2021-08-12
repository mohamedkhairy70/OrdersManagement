export class OrderItem {
  id: number =0;
  code: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;

  getTotal(): number{
    return this.quantity * this.price;
  }
}

export class Order {
  id: number=0;
  orderDate: Date = new Date();
  customerName: string;
  orderItems: Array<OrderItem> = new Array<OrderItem>();

  getTotal() : number {
    const result = this.orderItems.reduce(
      (total, value) => {
        return total + (value.price * value.quantity)
      }, 0);
    return result;
  }
}