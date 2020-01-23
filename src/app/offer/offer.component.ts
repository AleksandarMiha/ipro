import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferService } from '../serviceapi/offer.service';
import { MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  public allOfers: [] = [];
  displayedColumns: string[] = ['id', 'name', 'contractEndDate', 'contractStartDate'];
  offersDataSource  = new MatTableDataSource(this.allOfers);
  constructor(private offer: OfferService) { }

  ngOnInit() {
    this.getOffer();
  }

  getOffer(){
    this.offer.getOffers().subscribe((data:any)=> {
      this.allOfers = data.offers;
      this.offersDataSource.data = this.allOfers;
      console.log(this.allOfers);
    })
  }

  searchOffer(filterValue: string){
    this.offersDataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
