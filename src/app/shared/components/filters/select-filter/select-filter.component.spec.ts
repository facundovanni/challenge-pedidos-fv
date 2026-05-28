import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFilterComponent } from './select-filter.component';

describe('SelectFilterComponent', () => {
  let component: SelectFilterComponent;
  let fixture: ComponentFixture<SelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectFilterComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('options', [{ id: '1', name: 'Bebida' }]);
    fixture.detectChanges();
  });

  it('must update model when select a category', () => {
    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');

    selectElement.value = '1';
    selectElement.dispatchEvent(new Event('change'));

    expect(component.value()).toBe('1');
  });
});
