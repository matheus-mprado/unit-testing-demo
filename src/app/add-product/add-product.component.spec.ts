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
  let dialogRef: MatDialogRef<AddProductComponent>;
  let matSnackBar = jasmine.createSpyObj('MatSnackbar', ['open']);
  let mockProductService = jasmine.createSpyObj('ProductsService', [
    'updateProduct',
    'saveProduct',
  ]);
  let mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ProductsService, useValue: mockProductService },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: '1',
            title: 'Test Product',
            description: 'Test description',
            price: '19.99',
            category: 'Test category',
          } as Product,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef<AddProductComponent>);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form', () => {
    component.data = {} as Product;
    component.ngOnInit();

    expect(component.productForm.controls['title'].getRawValue()).toEqual('');
    expect(component.productForm.controls['description'].getRawValue()).toEqual(
      ''
    );
    expect(component.productForm.controls['price'].getRawValue()).toEqual('');
    expect(component.productForm.controls['category'].getRawValue()).toEqual(
      ''
    );
  });

  describe('should test add product functionality', () => {
    it('should call the saveProduct to add new product', () => {
      const data: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category',
      };
      component.data = {} as Product;

      mockProductService.saveProduct.and.returnValue(of(data));
      component.productForm.patchValue(data);
      component.saveProduct();
      expect(mockProductService.saveProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Added Successfully!...',
        '',
        {
          duration: 3000,
        }
      );
      expect(mockDialogRef.close).toHaveBeenCalled();
    });

    it('should test the saveProduct for failure while add a new product', () => {
      const data: Product = {
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category',
      };
      const error = new Error('Error while update a product');
      component.data = {} as Product;

      mockProductService.saveProduct.and.returnValue(throwError(() => error));
      component.productForm.patchValue(data);
      component.saveProduct();
      expect(mockProductService.saveProduct).toHaveBeenCalledWith(data);
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
      component.ngOnInit();
      expect(component.productForm.controls['title'].getRawValue()).toEqual(
        'Test Product'
      );
      expect(
        component.productForm.controls['description'].getRawValue()
      ).toEqual('Test description');
      expect(component.productForm.controls['price'].getRawValue()).toEqual(
        '19.99'
      );
      expect(component.productForm.controls['category'].getRawValue()).toEqual(
        'Test category'
      );
    });

    it('should call the saveProduct while editing the product', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category',
      };
      component.data = data;

      mockProductService.updateProduct.and.returnValue(of(data));
      component.productForm.patchValue(data);
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
      expect(matSnackBar.open).toHaveBeenCalledWith(
        'Updated Successfully!...',
        '',
        {
          duration: 3000,
        }
      );
    });

    it('should test the saveProduct for failure while update a product', () => {
      const data: Product = {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        price: '19.99',
        category: 'Test category',
      };
      const error = new Error('Error while update a product');
      component.data = data;

      mockProductService.updateProduct.and.returnValue(throwError(() => error));
      component.productForm.patchValue(data);
      component.saveProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(data);
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
