import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IListing } from '../services/listing.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() data!: IListing;
  constructor(private router: Router) {}
  navigateToListingDetails() {
    this.router.navigateByUrl(`/listing/${this.data._id}`);
  }
}
