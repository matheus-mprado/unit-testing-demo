import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';

import { NavBarComponent } from './nav-bar.component';
import { Type } from '@angular/core';
import { MatButton } from '@angular/material/button';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check menuItems array is initialized', () => {
    expect(component.menuItems).toBeDefined();
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  it('should check menuItem is rendered', () => {
    const menuItemElements = fixture.debugElement.queryAll(By.css('.menu-item'));
    menuItemElements.forEach((menuItemElement, index) => {
      const menuItemName = menuItemElement.nativeElement.textContent.trim();
      expect(menuItemName).toEqual(component.menuItems[index].name);
    });
  });


});
