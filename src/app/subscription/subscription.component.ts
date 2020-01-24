import { Component, OnInit, ViewChild  } from '@angular/core';
import { SubscriptionService } from '../serviceapi/subscription.service';
import { MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  public allSubscription: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'type', 'delete'];
  subscriptionDataSource  = new MatTableDataSource(this.allSubscription);
  @ViewChild(MatSort, { read: true }) sort: MatSort
  isTableHasData: boolean = true;
  isLoading: boolean = true;


  constructor(private subscription: SubscriptionService) { }

  ngOnInit() {
    this.getSubscription();
    this.subscriptionDataSource.sort = this.sort;
  }

  getSubscription(){
    this.subscription.getSubscriptions().subscribe((data:any)=>{
      this.isLoading = false;
      this.allSubscription = data.subscriptions;
      this.subscriptionDataSource.data = this.allSubscription;
      console.log(this.allSubscription);
    }), error => this.isLoading = false
  }

  searchSubscription(filterValue: string){
    this.subscriptionDataSource.filter = filterValue.trim().toLocaleLowerCase();
    if(this.subscriptionDataSource.filteredData.length > 0){
      this.isTableHasData = true;
    } else {
      this.isTableHasData = false;
    }
  }

  deleteSubscription(indexOfRow){
    if(window.confirm('Are sure you want to delete this offer ?')){
      const data = this.subscriptionDataSource.data;
      data.splice(indexOfRow, 1);
      this.subscriptionDataSource.data = data;
      }
  }


}
