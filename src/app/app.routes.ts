import { Routes } from '@angular/router';
import { LostItemsComponent } from './components/lost-items/lost-items.component';
import { FoundItemsComponent } from './components/found-items/found-items.component';
import { LostItemFormComponent } from './components/lost-item-form/lost-item-form.component';
import { FoundItemFormComponent } from './components/found-item-form/found-item-form.component';

export const routes: Routes = [
  { path: '', component: LostItemsComponent }, // default page
  { path: 'lost-items', component: LostItemsComponent },
  { path: 'found-items', component: FoundItemsComponent },
  { path: 'report-lost', component: LostItemFormComponent },
  { path: 'report-found', component: FoundItemFormComponent },
];
