import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMoviePage } from './view-movie.page';

describe('ViewMoviePage', () => {
  let component: ViewMoviePage;
  let fixture: ComponentFixture<ViewMoviePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
