import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  imageSrc!: string;

  constructor(
    private productService: ProductsService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private _data: Product,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  public get data(): Product {
    return this._data;
  }

  public set data(d: Product) {
    this._data = d;
  }

  ngOnInit(): void {
    //Verifica se existe dados no data e se existe propriedades no objeto.
    const hasData = this.data && Object.keys(this.data).length;
    //atribue o formgroup a sua variável e adiciona os valores nos campos com base na variável "data"
    this.productForm = new FormGroup({
      title: new FormControl(hasData ? this.data.title : ''),
      description: new FormControl(hasData ? this.data.description : ''),
      price: new FormControl(hasData ? this.data.price : ''),
      category: new FormControl(hasData ? this.data.category : ''),
    });
  }
  /**
   * saveProduct - Realiza o salvamento das informações com base nos valores salvos
   */
  saveProduct() {
    //pegando informações no formulário
    const product = this.productForm.value as Product;
    //verificando se existe propriedades no objeto
    if (Object.keys(this.data).length) {
      //salvando o id do produto selecionado
      product.id = this.data.id;
      //chama método de atualização passando o produto
      this.productService.updateProduct(product).subscribe({
        next: (res) => {
          //emite feedback de sucesso para o usuário
          this.snackbar.open('Updated Successfully!...', '', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        //emite feedback de erro para o usuário
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000,
          });
        },
      });
    } else {
      //chama o método de salvamento de novo produto
      this.productService.saveProduct(product).subscribe({
        next: (res) => {
          //emite feedback de sucesso para o usuário
          this.snackbar.open('Added Successfully!...', '', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        error: (error) => {
          //emite feedback de erro para o usuário
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000,
          });
        },
      });
    }
  }
}
