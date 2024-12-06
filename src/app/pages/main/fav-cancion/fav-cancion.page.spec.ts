import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavCancionPage } from './fav-cancion.page';

describe('FavCancionPage', () => {
  let component: FavCancionPage;
  let fixture: ComponentFixture<FavCancionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavCancionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
