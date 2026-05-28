import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('must update model()', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');

    inputElement.value = 'Hamburguesa';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.value()).toBe('Hamburguesa');
  });
});
