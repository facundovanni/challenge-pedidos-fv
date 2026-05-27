import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../core/interface/product.interface';
import { ProductService } from '../../../core/services/product.service';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent
  ],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true);
  viewMode = signal<'grid' | 'list'>('grid');

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.fetchProducts(params);
      });
  }

  async fetchProducts(params: Record<string, any>) {
    this.isLoading.set(true);
    try {
      const result = await this.productService.getProducts(params);
      this.products.set(result);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  toggleView(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }

  onAddToCart(product: Product) {
    console.log('add', { product });
  }

  onRemoveFromCart(product: Product) {
    console.log('remove', { product });
  }

  getQuantity(productId: number): number {
    console.log('getQuantity', { productId });
    const item = { quantity: 0};
    return item ? item.quantity : 0;
  }
}
