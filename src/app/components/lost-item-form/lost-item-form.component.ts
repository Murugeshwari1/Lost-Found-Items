import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lost-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lost-item-form.component.html',
  styleUrls: ['./lost-item-form.component.css']
})
export class LostItemFormComponent implements OnInit {
  item = {
    item_name: '',
    category: '',
    description: '',
    last_seen_location: '',
    date_lost: '',
    contact_info: ''
  };

  editMode = false;
  editId: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.editId = params.get('editId');
      if (this.editId) {
        this.editMode = true;
        this.loadItem(this.editId);
      }
    });
  }

  loadItem(id: string): void {
    this.http.get<any>(`http://localhost:3000/api/lost-items/${id}`).subscribe({
      next: (data) => this.item = data,
      error: (err) => console.error('Failed to load item for editing:', err)
    });
  }

  submitForm(): void {
    // 🔒 Check if all fields are filled
    const { item_name, category, description, last_seen_location, date_lost, contact_info } = this.item;
    if (!item_name || !category || !description || !last_seen_location || !date_lost || !contact_info) {
      alert('Please fill in all fields.');
      return;
    }

    // 🔒 Validate date: must not be in the future
    const today = new Date().toISOString().split('T')[0];
    if (this.item.date_lost > today) {
      alert('Lost date cannot be in the future.');
      return;
    }

    // ✅ Update or Submit logic
    if (this.editMode && this.editId) {
      this.http.put(`http://localhost:3000/api/lost-items/${this.editId}`, this.item).subscribe({
        next: () => alert('Item updated successfully!'),
        error: (err) => {
          console.error('Update failed:', err);
          alert('Failed to update item.');
        }
      });
    } else {
      this.http.post('http://localhost:3000/api/lost-items', this.item).subscribe({
        next: () => {
          alert('Lost item reported successfully!');
          this.resetForm();
        },
        error: (err) => {
          if (err.status === 409) {
            alert('This item has already been reported.');
          } else {
            console.error('Error reporting item:', err);
            alert('Failed to report item.');
          }
        }
      });
    }
  }

  resetForm(): void {
    this.item = {
      item_name: '',
      category: '',
      description: '',
      last_seen_location: '',
      date_lost: '',
      contact_info: ''
    };
    this.editMode = false;
    this.editId = null;
  }
}
