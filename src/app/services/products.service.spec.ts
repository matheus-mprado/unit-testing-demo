import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

fdescribe('ProductsService', () => {
  let product: Product;
  let response: Product;
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    product = {} as Product;
    response = {} as Product;
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should test getProducts', () => {
    service.getProducts().subscribe((res) => {
      expect(res.length).toEqual(0);
    });
    const req = httpController.expectOne(`${environment.baseAPI}products`);
    expect(req.request.method).toEqual('GET');
  });

  fit('should test saveProducts', () => {
    service.saveProduct(product).subscribe((res) => {
      expect(res).toEqual(response);
    });
    const req = httpController.expectOne(`${environment.baseAPI}products`);
    expect(req.request.method).toEqual('POST');
  });

 fit('should test updateProduct', () => {
    product.id = '1'
    service.updateProduct(product).subscribe((res) => {
      expect(res).toEqual(response);
    });
    const req = httpController.expectOne(`${environment.baseAPI}products/${product.id}`);
    expect(req.request.method).toEqual('PUT');
  });

  fit('should test deleteProduct', () => {
     product.id = '1';
     service.deleteProduct(Number(product.id)).subscribe((res) => {
      expect(res).toEqual(response);
    });
    const req = httpController.expectOne(`${environment.baseAPI}products/${product.id}`);
    expect(req.request.method).toEqual('DELETE');
  });
});
