
import {
  Component
} from '@angular/core';

@Component({
  selector: 'root',
  template: `
<div>
  <input [(ngModel)]="message">
  <p>Hello World!</p>
  <p>{{message}}</p>
  <p *ngIf="colour">I am {{color}}!</p>
</div>`
})
export class TestComponent {
  message = 'Hello Angular! (edit me)'
  color: string;
}
