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
  displayedColumns: string[] = ['id', 'name', 'contractEndDate', 'contractStartDate', 'delete'];
  offersDataSource  = new MatTableDataSource(this.allOfers);
  isTableHasData: boolean = true;
  isLoading: boolean = true;
  constructor(private offer: OfferService) { }

  ngOnInit() {
    this.getOffer();
  }

  getOffer(){
    this.offer.getOffers().subscribe((data:any)=> {
      this.isLoading = false;
      this.allOfers = data.offers;
      this.offersDataSource.data = this.allOfers;
      console.log(this.allOfers);
    }), error => this.isLoading = false
  }

  searchOffer(filterValue: string){
    this.offersDataSource.filter = filterValue.trim().toLocaleLowerCase();
    if(this.offersDataSource.filteredData.length > 0){
      this.isTableHasData = true;
    } else {
      this.isTableHasData = false;
    }
  }
  //this is should be index of row in database but for this situation i need this.
  deleteOffer(indexOfRow) {
    // this.offersDataSource.data.splice(indexOfRow, 1);
    if(window.confirm('Are sure you want to delete this offer ?')){
    const data = this.offersDataSource.data;
    data.splice(indexOfRow, 1);
    this.offersDataSource.data = data;
    }
  }

}
