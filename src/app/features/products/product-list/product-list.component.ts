import { Component, DestroyRef, inject, OnInit, Query, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../core/interface/product.interface';
import { ProductService } from '../../../core/services/product.service';
import { QueryParams, FilterOption } from '../../../core/interface/query-params.interface';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductToolbarComponent } from '../product-toolbar/product-toolbar.component';
import { MOCK_CATEGORIES } from '../../../core/mocks/categories.mock';
import { QueryStringService } from '../../../core/services/query-string.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent, ProductToolbarComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private queryService = inject(QueryStringService);
  private cartService = inject(CartService);

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true);
  viewMode = signal<'grid' | 'list'>('grid');
  queryParams = signal<QueryParams>({ filters: [], search: '', searchBy: [] });

  categories = signal(MOCK_CATEGORIES);

  ngOnInit() {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.queryParams.set(this.queryService.toQueryParams(params));
      this.fetchProducts(this.queryParams());
    });
  }

  onQueryChanged(query: QueryParams) {
    const urlParams = this.queryService.toUrlParams(query);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: urlParams,
      queryParamsHandling: 'replace'
    });
  }

  async fetchProducts(params: QueryParams) {
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
    this.cartService.addToCart(product);
  }

  onRemoveFromCart(product: Product) {
    this.cartService.decreaseQuantity(product.id);
  }

  getQuantity(productId: number): number {
    const item = this.cartService.cartItems().find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  }
}
