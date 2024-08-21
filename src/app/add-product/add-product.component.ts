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
  ) { }

  /*
    O getter, chamado get data(), retorna o valor atual da propriedade _data.
    Isso permite que outros componentes ou partes do código obtenham o valor
    da propriedade _data sem acessá-la diretamente.
  */
  public get data(): Product {
    return this._data;
  }

  /*
  O setter, chamado set data(d: Product), permite que outros componentes ou partes do código
  atribuam um novo valor à propriedade _data.
  Ele recebe um parâmetro d do tipo Product, que é o novo valor a ser atribuído à propriedade _data.
  */
  public set data(d: Product) {
    this._data = d;
  }

  /*
  Este método é chamado `ngOnInit()`, que é um método de ciclo de vida do Angular que é chamado automaticamente quando um componente é inicializado.
  A primeira linha do método verifica se a propriedade `data` do componente existe e se ela tem alguma chave. Se ambas as condições forem verdadeiras, `hasData` será verdadeiro; caso contrário, será falso.
  Em seguida, o método cria um novo `FormGroup` chamado `productForm`. `FormGroup` é uma classe do Angular que agrupa instâncias de `FormControl`. `FormControl` é uma classe que rastreia o valor e o estado de validação de um controle de formulário individual.
  Cada `FormControl` é inicializado com um valor. Se `hasData` for verdadeiro, o `FormControl` será inicializado com o valor correspondente da propriedade `data`. Se `hasData` for falso, o `FormControl` será inicializado com uma string vazia.

  Aqui está o que cada `FormControl` representa:

  - `title`: representa o título do produto.
  - `description`: representa a descrição do produto.
  - `price`: representa o preço do produto.
  - `category`: representa a categoria do produto.

  Portanto, este método está preparando o formulário do produto para uso, preenchendo-o com dados do produto se eles existirem.

  */
  ngOnInit(): void {
    const hasData = this.data && Object.keys(this.data).length;
    this.productForm = new FormGroup({
      title: new FormControl(hasData ? this.data.title : ''),
      description: new FormControl(hasData ? this.data.description : ''),
      price: new FormControl(hasData ? this.data.price : ''),
      category: new FormControl(hasData ? this.data.category : ''),
    });
  }
/*
  A função `saveProduct()` salva ou atualiza um produto com base nos dados fornecidos no formulário.

  Primeiro, ela obtém os valores do formulário usando `this.productForm.value` e os atribui a uma variável chamada `product`.

  Em seguida, verifica se a propriedade `data` possui alguma chave usando `Object.keys(this.data).length`. Se a propriedade `data` tiver chaves, significa que o produto já existe e precisa ser atualizado. Nesse caso, o `id` do produto é atribuído à propriedade `id` do objeto `product`.

  Depois, a função chama o método `updateProduct()` do serviço `productService` para atualizar o produto. Se a atualização for bem-sucedida, exibe uma mensagem de sucesso usando `this.snackbar.open()` e fecha o diálogo usando `this.dialogRef.close()`. Caso contrário, exibe uma mensagem de erro.

  Se a propriedade `data` não tiver chaves, significa que é um novo produto e precisa ser salvo. Nesse caso, a função chama o método `saveProduct()` do serviço `productService` para salvar o produto. O comportamento é semelhante ao caso de atualização, exibindo uma mensagem de sucesso ou erro.

  Em resumo, a função `saveProduct()` salva ou atualiza um produto com base nos dados do formulário e exibe mensagens de sucesso ou erro usando o `MatSnackBar`.
*/
  saveProduct() {
    const product = this.productForm.value as Product;
    if (Object.keys(this.data).length) {
      product.id = this.data.id;
      this.productService.updateProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Updated Successfully!...', '', {
            duration: 3000
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000
          });
        }
      });
    } else {
      this.productService.saveProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Added Successfully!...', '', {
            duration: 3000
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000
          });
        }
      });
    }
  }
}
