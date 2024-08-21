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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test get products initially', () => {
    it('should get product data initially', () => {
      const products: Product[] = [
       {
          title: 'Test Product',
          description: 'Test description',
          price: '19.99',
          category: 'Test category'
        }
      ];
      expect(component.showSpinner).toBeFalse();
      mockProductService.getProducts.and.returnValue(of(products));
      component.getProducts();
      expect(mockProductService.getProducts).toHaveBeenCalled();

      fixture.whenStable().then(() => {
        expect(component.productData).toEqual(products);
        expect(component.showSpinner).toBeFalse();
      });
    });

    it('should get product data initially on failure', () => {
      const error = new Error('Something went wrong!...');

      mockProductService.getProducts.and.returnValue(throwError(() => error));

      expect(component.showSpinner).toBeFalse();
      component.getProducts();
      expect(mockProductService.getProducts).toHaveBeenCalled();

      fixture.whenStable().then(() => {
        expect(component.showSpinner).toBeFalse();
        expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', { duration: 3000 });
      });
    });
  });

  it('should test openDialog', () => {
    component.openDialog();
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      width: '40%',
    });
  });

  it('should test editDialog', () => {
    const product: Product =  {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      price: '19.99',
      category: 'Test category'
    }

    component.editProduct(product);

    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      data: product,
      width: '40%',
    });
  });

  describe('should test deleteProduct', () => {
    it('should test deleteProduct on success', () => {
      const product: Product =  {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      }
      mockProductService.deleteProduct.and.returnValue(of({}));

      component.deleteProduct(product);

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(product.id);

      expect(matSnackBar.open).toHaveBeenCalledWith('Deleted Successfully!...', '', { duration: 3000 });
      // fixture.whenStable().then(() => {
      // });
    });

    it('should test deleteProduct on failure', () => {
      const product: Product =  {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category'
      }
      const error = new Error('Something went wrong!...')

      mockProductService.deleteProduct.and.returnValue(throwError(() => error));

      component.deleteProduct(product);

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(product.id);

      fixture.whenStable().then(() => {
        expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', { duration: 3000 });
      });
    });
  });
});
