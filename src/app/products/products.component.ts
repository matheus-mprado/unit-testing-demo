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
  /*
  A função `getProducts()` é usada para buscar produtos do servidor.

  Primeiro, ela define `this.showSpinner` como `true`, o que provavelmente mostra um spinner de carregamento na interface do usuário.

  Em seguida, ela chama o método `getProducts()` do serviço `productService`, que provavelmente retorna um Observable. Ela se inscreve neste Observable para receber os produtos quando estiverem disponíveis.

  O método `subscribe()` recebe um objeto com duas funções: `next` e `error`.

  A função `next` é chamada quando os dados (neste caso, os produtos) são recebidos do servidor. Ela atribui os produtos recebidos à propriedade `this.productData` e define `this.showSpinner` como `false`, o que provavelmente oculta o spinner de carregamento.

  A função `error` é chamada se ocorrer um erro ao buscar os produtos. Ela define `this.showSpinner` como `false` e mostra uma mensagem de erro usando o serviço `MatSnackBar`.

  Portanto, a função `getProducts()` é usada para buscar produtos do servidor, mostrar um spinner de carregamento enquanto os produtos estão sendo buscados, e mostrar uma mensagem de erro se algo der errado.
  */
  getProducts() {
    this.showSpinner = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productData = res;
        this.showSpinner = false;
      },
      error: (err) => {
        this.showSpinner = false;
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      }
    });
  }

  /**
   * Opens the dialog to add a product.
   */
  openDialog() {
    this.dialog.open(AddProductComponent, {
      width: '40%',
    });
  }

  /**
   * Opens a dialog to edit a product.
   * @param product - The product to be edited.
   */
  editProduct(product: Product) {
    this.dialog.open(AddProductComponent, {
      data: product,
      width: '40%',
    });
  }

  /**
   * Deletes a product.
   * @param product - The product to be deleted.
   */
  deleteProduct(product: any) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (res) => {
        this.snackbar.open('Deleted Successfully!...', '', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackbar.open('Something went wrong!...', '', {
          duration: 3000
        });
      },
    });
  }
}
