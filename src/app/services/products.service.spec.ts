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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    const mockProducts: Product[] = [
        {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      },
      {
        id: '2',
        title: 'Test Product',
        description: 'Test description',
        price: '20.99',
        category: 'Test category'
      }
    ];

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpController.expectOne(`${environment.baseAPI}products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should test saveProduct', () => {
    const mockProduct: Product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      price: '19.99',
      category: 'Test category'
    };

    service.saveProduct(mockProduct).subscribe((savedProduct) => {
      expect(savedProduct).toEqual(mockProduct);
    });

    const req = httpController.expectOne(`${environment.baseAPI}products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockProduct);
  });

  it('should test updateProduct', () => {
   const mockProduct: Product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      price: '19.99',
      category: 'Test category2'
    };

    service.updateProduct(mockProduct).subscribe((updatedProduct) => {
      expect(updatedProduct).toEqual(mockProduct);
    });

    const req = httpController.expectOne(`${environment.baseAPI}products/${mockProduct.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockProduct);
  });

  it('should test deleteProduct', () => {
    const productId = 1;

    service.deleteProduct(productId).subscribe((deletedProduct) => {
      expect(Number(deletedProduct.id)).toBe(productId);
    });

    const req = httpController.expectOne(`${environment.baseAPI}products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ id: productId });
  });

});
