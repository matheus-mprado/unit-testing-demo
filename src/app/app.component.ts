import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {}

  /**
   * Adds two numbers.
   * @param a The first number.
   * @param b The second number.
   * @returns The sum of the two numbers.
   */
  add(a: number, b: number) {
    return a + b;
  }
}
