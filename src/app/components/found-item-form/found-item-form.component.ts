import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-found-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './found-item-form.component.html',
  styleUrls: ['./found-item-form.component.css']
})
export class FoundItemFormComponent implements OnInit {
  item = {
    item_name: '',
    category: '',
    description: '',
    found_location: '',
    date_found: '',
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
    this.http.get<any>(`http://localhost:3000/api/found-items/${id}`).subscribe({
      next: (data) => this.item = data,
      error: (err) => console.error('Failed to load found item for editing:', err)
    });
  }

  submitForm(): void {
    if (!this.validateFields()) {
      alert('Please fill in all required fields and ensure the date is not in the future.');
      return;
    }

    if (this.editMode && this.editId) {
      // PUT: update existing
      this.http.put(`http://localhost:3000/api/found-items/${this.editId}`, this.item).subscribe({
        next: () => alert('Item updated successfully!'),
        error: (err) => {
          console.error('Update failed:', err);
          alert('Failed to update item.');
        }
      });
    } else {
      // POST: create new
      this.http.post('http://localhost:3000/api/found-items', this.item).subscribe({
        next: () => {
          alert('Found item reported successfully!');
          this.resetForm();
        },
        error: (err) => {
          if (err.status === 409) {
            alert('This item has already been reported.');
          } else {
            console.error('Error reporting found item:', err);
            alert('Failed to report found item.');
          }
        }
      });
    }
  }

  validateFields(): boolean {
    const { item_name, category, description, found_location, date_found, contact_info } = this.item;
    const today = new Date().toISOString().split('T')[0];
    return (
      item_name.trim() !== '' &&
      category.trim() !== '' &&
      description.trim() !== '' &&
      found_location.trim() !== '' &&
      contact_info.trim() !== '' &&
      date_found !== '' &&
      date_found <= today
    );
  }

  resetForm(): void {
    this.item = {
      item_name: '',
      category: '',
      description: '',
      found_location: '',
      date_found: '',
      contact_info: ''
    };
  }
}
