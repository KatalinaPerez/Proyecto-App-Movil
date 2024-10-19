import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-e404',
  templateUrl: './e404.page.html',
  styleUrls: ['./e404.page.scss'],
})

export class E404Page implements OnInit {

  constructor() { }

  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

}
