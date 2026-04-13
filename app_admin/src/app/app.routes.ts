import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';

export const routes: Routes = [
  { path: '', component: TripListingComponent },
  { path: 'add-trip', component: AddTrip },
  { path: 'edit-trip', component: EditTrip }
];