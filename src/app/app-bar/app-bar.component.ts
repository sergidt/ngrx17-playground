import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-bar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './app-bar.component.html',
    styleUrl: 'app-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBarComponent {

}
