import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LostItemService } from '../../services/lost-item.service'; // ✅ Correct path

@Component({
  selector: 'app-lost-items',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lost-items.component.html',
  styleUrls: ['./lost-items.component.css']
})
export class LostItemsComponent implements OnInit {
  lostItems: any[] = [];

  constructor(
    private lostItemService: LostItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchLostItems();
  }

  fetchLostItems(): void {
    this.lostItemService.getLostItems().subscribe({
      next: (data: any[]) => this.lostItems = data,
      error: (err: any) => console.error('Failed to fetch lost items:', err)
    });
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.lostItemService.deleteLostItem(id).subscribe({
        next: () => {
          this.lostItems = this.lostItems.filter(item => item.id !== id);
          alert('Item deleted successfully!');
        },
        error: (err: any) => {
          console.error('Failed to delete item:', err);
          alert('Error deleting item.');
        }
      });
    }
  }

  editItem(id: number): void {
    this.router.navigate(['/report-lost'], { queryParams: { editId: id } });
  }
}
