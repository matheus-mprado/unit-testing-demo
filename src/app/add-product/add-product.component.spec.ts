import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'updateProduct',
    'saveProduct',
  ]);
  let product: Product;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule],
      declarations: [AddProductComponent],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: ProductsService, useValue: mockProductService },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close', 'open']),
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;

    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);
    product = {
      title: 'Product Title',
      price: '20',
      description: 'Product Description',
      category: 'Smartwatches',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form', () => {
    const emptyForm = {
      title: '',
      description: '',
      price: '',
      category: '',
    };
    expect(component.productForm.getRawValue()).toEqual(emptyForm);
  });

  describe('should test add product functionality', () => {
    it('should call the saveProduct to add new product', () => {
      component.productForm.patchValue(product);
      mockProductService.saveProduct.and.returnValue(of(product));
      component.saveProduct();

      expect(mockProductService.saveProduct).toHaveBeenCalledWith(product);
    });

    it('should test the saveProduct for failure while add a new product', () => {
      component.productForm.patchValue(product);
      mockProductService.saveProduct.and.returnValue(
        throwError(() => new Error('OPS!'))
      );
      component.saveProduct();

      expect(mockProductService.saveProduct).toHaveBeenCalledWith(product);
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Something went wrong!...',
        '',
        {
          duration: 3000,
        }
      );
    });
  });

  describe('should test edit product functionality', () => {
    it('should set the form controls to the correct values when data is provided', () => {
      component.data = product;
      component.ngOnInit();
      expect(component.productForm.getRawValue()).toEqual(product);
    });

    it('should call the saveProduct while editing the product', () => {
      product.id = '1';
      component.data = product;
      mockProductService.updateProduct.and.returnValue(of(product));
      component.productForm.patchValue(product);

      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(product);
    });

    it('should test the saveProduct for failure while update a product', () => {
      product.id = '1';
      component.data = product;
      mockProductService.updateProduct.and.returnValue(
        throwError(() => new Error('OPS!'))
      );
      component.productForm.patchValue(product);
      component.saveProduct();

      expect(mockProductService.updateProduct).toHaveBeenCalledWith(product);
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
