import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styles: [`
    h1 {
      color: #CCC;
    }
  `]
})
export class TitleComponent implements OnInit {

  @Input()
  title!: string;

  @Input()
  margin?: string = '1rem 0 1rem 0.2rem';

  @Input()
  fontSize?: string = '1.7rem';

  constructor() { }

  ngOnInit(): void {
  }

}
