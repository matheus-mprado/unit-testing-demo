import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
  /**
   * add - Soma dois valores numéricos e retorna o resultado no tipo number
   * @param a primeiro valor no tipo numérico
   * @param b segundo valor no tipo numérico
   * @returns resultado da soma dos dois valores
   */
  add(a: number, b: number) {
    return a + b;
  }
}
