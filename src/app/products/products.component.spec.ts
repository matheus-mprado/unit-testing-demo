import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let dialog = jasmine.createSpyObj('MatDialog', ['open']);
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'getProducts',
    'deleteProduct',
  ]);
  let product: Product;

  mockProductService.getProducts.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [SharedModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialog, useValue: dialog },
        { provide: ProductsService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
    product = {
      id: '1',
      title: 'Product Title',
      price: '20',
      description: 'Product Description',
      category: 'Smartwatches',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test get products initially', () => {
    it('should get product data initially', () => {
      const products: Product[] = [{ ...product }];

      mockProductService.getProducts.and.returnValue(of(products));
      component.getProducts();
      expect(mockProductService.getProducts).toHaveBeenCalled();
      expect(component.productData).toEqual(products);
    });

    it('should get product data initially on failure', () => {
      mockProductService.getProducts.and.returnValue(
        throwError(() => new Error('OPS!'))
      );
      component.getProducts();

      expect(mockProductService.getProducts).toHaveBeenCalled();
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Something went wrong!...',
        '',
        {
          duration: 3000,
        }
      );
    });
  });

  it('should test openDialog', () => {
    component.openDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should test editDialog', () => {
    component.editProduct(product);
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      data: product,
      width: '40%',
    });
  });

  describe('should test deleteProduct', () => {
    it('should test deleteProduct on success', () => {
      mockProductService.deleteProduct.and.returnValue(of(product));
      component.deleteProduct(product);

      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Deleted Successfully!...',
        '',
        {
          duration: 3000,
        }
      );
    });

    it('should test deleteProduct on failure', () => {
      mockProductService.deleteProduct.and.returnValue(
        throwError(() => new Error('OPS!'))
      );
      component.deleteProduct(product);

      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Something went wrong!...',
        '',
        {
          duration: 3000,
        }
      );
    });
  });
});
