import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongFormComponent } from './song-form.component';

describe('SongFormComponent', () => {
  let component: SongFormComponent;
  let fixture: ComponentFixture<SongFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SongFormComponent]
    });
    fixture = TestBed.createComponent(SongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
