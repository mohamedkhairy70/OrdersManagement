import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderItem } from 'src/app/models/order';
import { Orderservice } from 'src/app/shared/orderservice.service';

@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.css']
})
export class OrderMainComponent implements OnInit {
  form: FormGroup;
  formItem: FormGroup;
  customerName: string;
  orderDate:string ;
  newOrde: Order = new Order;
  private Id = 0;
  private IdEdit = 0;
  checkMain: boolean = false;

  constructor(private service: Orderservice
    , private formbuilder: FormBuilder
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.restForm();
  }
  restForm() {
    this.form = this.formbuilder.group({
      id: 0,
      orderDate: new Date(),
      customerName: ['',Validators.required]
    });
    this.formItem = this.formbuilder.group({
      id: 0,
      code: 0,
      productName: ['',Validators.required],
      price: 0,
      quantity:0
    });
  }
  showItem() {    
    this.newOrde.customerName = this.form.get("customerName")?.value;
    this.newOrde.orderDate = this.form.get("orderDate")?.value;
    this.Id= this.newOrde.orderItems.length+1;
    this.newItem();
  }

  newItem() {

    let NewItem = new OrderItem();
    NewItem.id = 0;
    NewItem.code = this.Id;
    NewItem.price = 0;
    NewItem.productName = "Product Name";
    NewItem.quantity = 0;

    this.newOrde.orderItems.push(NewItem);
    
  }
  addItem() {
    
    let id = this.IdEdit;
    if (!id)
    {
      if (this.Id > 1) {
        this.newItem();
      }
      id = this.Id;
    }
    let item = this.newOrde.orderItems.find(i => i.code === id);
    if (item) {
      item.code = id;
      item.price = this.formItem.get("price")?.value;
      item.productName = this.formItem.get("productName")?.value;
      item.quantity = this.formItem.get("quantity")?.value;
      this.Id = this.newOrde.orderItems.length + 1;
      this.IdEdit = 0;
    }
  }

  removeItem(item:OrderItem) {
    this.service.removeItem(this.newOrde.orderItems,item);
  }

  editItem(item:OrderItem) {
    this.IdEdit = item.code;
    this.formItem = this.formbuilder.group({
      id: item.id,
      code: item.code,
      productName: [item.productName,Validators.required],
      price: item.price,
      quantity:item.quantity
    });
  }

  saveOrder() {
    this.service.addOrder(this.newOrde).subscribe(res => {
      this.toastr.success('Success Add Order', 'Add Employee')
      this.form.reset();
      this.formItem.reset();
      this.newOrde = new Order();
      this.restForm();
    });
  }

  check(): boolean
  {
    
    if (this.newOrde.orderItems.length > 0)
    {
      this.checkMain = true;
      return true;


    } else {
      this.checkMain = false;
      return false;
    }
  }
}
