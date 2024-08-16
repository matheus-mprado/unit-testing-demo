import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;
  let baseAPI: string;
  let product: Product;

  beforeEach(() => {
    baseAPI = environment.baseAPI;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    product = {
      id: '1',
      title: 'Product Title',
      price: '20',
      description: 'Product Description',
      category: 'Smartwatches',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    const products: Product[] = [{ ...product }];

    service.getProducts().subscribe((response) => {
      expect(response).toEqual(products);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseAPI}products`,
    });

    req.flush(products);
  });

  it('should test saveProducts', () => {
    service.saveProduct(product).subscribe((response) => {
      expect(response).toEqual(product);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${baseAPI}products`,
    });

    req.flush(product);
  });

  it('should test updateProduct', () => {
    service.updateProduct(product).subscribe((response) => {
      expect(response).toEqual(product);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${baseAPI}products/${product.id}`,
    });

    req.flush(product);
  });

  it('should test deleteProduct', () => {
    service.deleteProduct(Number(product.id)).subscribe((response) => {
      expect(response).toEqual(product);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${baseAPI}products/${product.id}`,
    });

    req.flush(product);
  });
});
