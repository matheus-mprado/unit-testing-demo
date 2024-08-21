import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseAPI = environment.baseAPI;
  constructor(private http: HttpClient) {}

  /**
   * getProducts - Realiza a chamada da requisição via get para receber a lista de produtos
   * @returns Observable contendo a lista de todos os produtos
   */
  getProducts() {
    return this.http.get<Product[]>(`${this.baseAPI}products`);
  }
 /**
   * saveProduct - Realiza a chamada da requisição via Post para adicionar um novo produto
   * @param product Produto a ser adicionado
   * @returns Observable contendo a resposta da requisição Post de saveProduct
   */
  saveProduct(product: Product) {
    return this.http.post<Product>(
      `${this.baseAPI}products`,
      product
    );
  }
 /**
   * deleteProduct - Realiza a chamada da requisição via Delete para remover o produto
   * @param id identificador do produto selecionado
   * @returns Observable contendo a resposta da requisição delete de deleteProduct
   */
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.baseAPI}products/${id}`);
  }
  /**
   * updateProduct - Realiza a chamada da requisição via put para atualizar o produto
   * @param product Produto a ser atualizado
   * @returns Observable contendo a resposta da requisição PUT de updateProduct
   */
  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseAPI}products/${product.id}`,
      product
    );
  }
}
