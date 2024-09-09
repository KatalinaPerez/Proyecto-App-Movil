import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  cards = [
    { title: 'Card 1', image: 'assets/img/card1.jpg' },
    { title: 'Card 2', image: 'assets/img/card2.jpg' },
    { title: 'Card 3', image: 'assets/img/card3.jpg' },
    { title: 'Card 4', image: 'assets/img/card4.jpg' },
    { title: 'Card 5', image: 'assets/img/card5.jpg' },
  ];
}