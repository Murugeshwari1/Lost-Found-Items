import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Ensures the service is injectable globally
})
export class LostItemService {
  private apiUrl = 'http://localhost:3000/api/lost-items';

  constructor(private http: HttpClient) {}

  getLostItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteLostItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
