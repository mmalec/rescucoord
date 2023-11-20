import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PouchdbService } from 'src/app/pouchdb.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@Component({
  selector: 'app-tabela-danych',
  templateUrl: './tabela-danych.component.html',
  styleUrls: ['./tabela-danych.component.scss'],
  providers: [MessageService]
})
export class TabelaDanychComponent implements OnInit {

  cols: any[];
  data: any[];


  productDialog: boolean = false;

  products!: any[];

  product!: any;

  selectedProducts!: any[] | null;

  submitted: boolean = false;

  statuses!: any[];
  
  constructor(private db: PouchdbService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  async ngOnInit(): Promise<void> {
    console.log("działa on init")
    const rawData = await this.db.getData();
    console.log('Znaleciono ' + rawData)
    this.cols = Object.keys(rawData[0]).map(key => ({ field: key, header: key }));
    this.data = rawData;


    
  this.db.getChanges().subscribe(change => {
    console.log('Zmiany w tabeli do obsłużenia');
    
    //this.updateTable(change.doc);
  });
  }




  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

 async  deleteSelectedProducts() {
    console.log('Działa DELETE'),
    console.log('Selected '+this.selectedProducts[0]._id)
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.selectedProducts.forEach(async element => {
          var docId = element._id
          console.log('Znalezione _id '+docId)
          try {
            // Pobranie dokumentu na podstawie _id
            const doc = await this.db.getDB().get(docId);
      
            // Usunięcie dokumentu
            const response = await this.db.getDB().remove(doc);
            return response;
          } catch (error) {
            console.error("Błąd podczas usuwania dokumentu: ", error);
            throw error;
          }
        });
          
        
     
       // this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default: return 'error';
    }
  }
}



