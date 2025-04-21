import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: any = null;
  type: 'lost' | 'found' = 'lost';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.url[0].path; // 'lost-items' or 'found-items'
    this.type = url === 'found-items' ? 'found' : 'lost';

    const endpoint = this.type === 'found'
      ? `http://localhost:3000/api/found-items/${id}`
      : `http://localhost:3000/api/lost-items/${id}`;

    this.http.get(endpoint).subscribe({
      next: (data) => this.item = data,
      error: (err) => console.error('Failed to load item:', err)
    });
  }

  editItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const routePath = this.type === 'found' ? '/found-items/new' : '/lost-items/new';
    this.router.navigate([routePath], { queryParams: { editId: id } });
  }

  deleteItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const endpoint = this.type === 'found'
      ? `http://localhost:3000/api/found-items/${id}`
      : `http://localhost:3000/api/lost-items/${id}`;

    if (confirm('Are you sure you want to delete this item?')) {
      this.http.delete(endpoint).subscribe({
        next: () => {
          alert('Item deleted successfully!');
          this.router.navigate([`/${this.type}-items`]);
        },
        error: (err) => {
          console.error('Failed to delete item:', err);
          alert('Something went wrong while deleting.');
        }
      });
    }
  }
}
