import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './app-bar.component.html',
    styleUrl: 'app-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBarComponent {
    router = inject(Router);

    showShoppingCard() {
        this.router.navigateByUrl('/shopping-card');
    }
}
