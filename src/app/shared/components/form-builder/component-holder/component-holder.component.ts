import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'cs-component-holder',
  templateUrl: './component-holder.component.html',
  styleUrls: ['./component-holder.component.scss'],
})
export class ComponentHolderComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
