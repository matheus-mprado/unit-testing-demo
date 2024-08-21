import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productData!: Product[];
  showSpinner = false;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  /**
   * getProducts - Realiza a chamada da listagem de produtos
   */
  getProducts() {
    //iniciando o spinner
    this.showSpinner = true;
    // chamada do método de listagem
    this.productService.getProducts().subscribe({
      next: (res) => {
        //salvando dados da listagem na variável global productData
        this.productData = res;
        //encerrando spinner
        this.showSpinner = false;
      },
      error: (err) => {
        //encerrando spinner
        this.showSpinner = false;

        //emitindo feedback para o usuário
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000,
        });
      },
    });
  }
  /**
   * openDialog - Realiza abertura da caixa de dialogo passando o produto como parâmetro
   * @param product
   */
  openDialog() {
    //abrindo o dialog parssando o component "AddProductComponent" com tamanho pré-definido
    this.dialog.open(AddProductComponent, {
      width: '40%',
    });
  }
  /**
   * editProduct - Realiza abertura da caixa de dialogo passando o produto como parâmetro
   * @param product
   */
  editProduct(product: Product) {
    //abrindo o dialog parssando o component "AddProductComponent" com tamanho pré-definido e o produto selecionado
    this.dialog.open(AddProductComponent, {
      data: product,
      width: '40%',
    });
  }
/**
 * deleteProduct - Realiza a chamada do método de remoção passando o id do produto selecionado
 * @param product passa um produto como parâmetro
 */
  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        //Emitindo feedback de sucesso para o usuário
        this.snackbar.open('Deleted Successfully!...', '', {
          duration: 3000,
        });
      },
      error: () => {
        //Emitindo feedback de falha para o usuário
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000,
        });
      },
    });
  }
}
