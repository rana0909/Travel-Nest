import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.component.html',
  styleUrls: ['./addlisting.component.css'],
})
export class AddlistingComponent {
  constructor(private listingService: ListingService, private router: Router) {}

  addlistingForm = new FormGroup({
    name: new FormControl(''),
    propertyType: new FormControl(''),
    cancellationPolicy: new FormControl(''),
    description: new FormControl(''),
    accomodates: new FormControl(0),
    bedrooms: new FormControl(0),
    beds: new FormControl(0),
    bathrooms: new FormControl(0),
    price: new FormControl(0),
    rules: new FormControl(''),
    imageUrl: new FormControl(''),
    building: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
  });

  addListing() {
    this.listingService.addListing(this.addlistingForm).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.router.navigateByUrl('/');
  }

  incrementAccomodates(field: string) {
    this.addlistingForm.patchValue({
      accomodates: this.addlistingForm.get(field)?.value + 1,
    });
  }

  decrementAccomodates(field: string) {
    this.addlistingForm.patchValue({
      accomodates: this.addlistingForm.get(field)?.value - 1,
    });
  }

  incrementBedrooms(field: string) {
    this.addlistingForm.patchValue({
      bedrooms: this.addlistingForm.get(field)?.value + 1,
    });
  }

  decrementBedrooms(field: string) {
    this.addlistingForm.patchValue({
      bedrooms: this.addlistingForm.get(field)?.value - 1,
    });
  }

  incrementBeds(field: string) {
    this.addlistingForm.patchValue({
      beds: this.addlistingForm.get(field)?.value + 1,
    });
  }

  decrementBeds(field: string) {
    this.addlistingForm.patchValue({
      beds: this.addlistingForm.get(field)?.value - 1,
    });
  }

  incrementBathrooms(field: string) {
    this.addlistingForm.patchValue({
      bathrooms: this.addlistingForm.get(field)?.value + 1,
    });
  }

  decrementBathrooms(field: string) {
    this.addlistingForm.patchValue({
      bathrooms: this.addlistingForm.get(field)?.value - 1,
    });
  }
}
