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
  displayedColumns: string[] = ['id', 'name', 'type'];
  subscriptionDataSource  = new MatTableDataSource(this.allSubscription);
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatSort, { read: true }) sort: MatSort


  constructor(private subscription: SubscriptionService) { }

  ngOnInit() {
    this.getSubscription();
    this.subscriptionDataSource.sort = this.sort;
  }

  getSubscription(){
    this.subscription.getSubscriptions().subscribe((data:any)=>{
      this.allSubscription = data.subscriptions;
      this.subscriptionDataSource.data = this.allSubscription;
      console.log(this.allSubscription);
    })
  }

  searchSubscription(filterValue: string){
    this.subscriptionDataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
