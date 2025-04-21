import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-found-items',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './found-items.component.html',
  styleUrls: ['./found-items.component.css']
})
export class FoundItemsComponent implements OnInit {
  foundItems: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchFoundItems();
  }

  fetchFoundItems(): void {
    this.http.get<any[]>('http://localhost:3000/api/found-items').subscribe({
      next: (data) => this.foundItems = data,
      error: (err) => console.error('Failed to fetch found items:', err)
    });
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.http.delete(`http://localhost:3000/api/found-items/${id}`).subscribe({
        next: () => {
          this.foundItems = this.foundItems.filter(item => item.id !== id);
          alert('Item deleted successfully!');
        },
        error: (err) => {
          console.error('Failed to delete item:', err);
          alert('Error deleting item.');
        }
      });
    }
  }

  editItem(id: number): void {
    this.router.navigate(['/report-found'], { queryParams: { editId: id } });
  }
}
