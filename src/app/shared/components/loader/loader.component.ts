import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'shared-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  loading = false;
  private loadingSubscription!: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loadingSubscription = this.loaderService.loading$.subscribe(
      (isLoading: boolean) => {
        this.loading = isLoading;
      }
    );
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
