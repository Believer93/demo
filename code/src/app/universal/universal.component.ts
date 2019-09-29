import { HttpClient } from '@angular/common/http';
import { DataStore } from './../engine/data-store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-universal',
  templateUrl: './universal.component.html',
  styleUrls: ['./universal.component.scss']
})
export class UniversalComponent implements OnInit {
  dataStore: DataStore;
  constructor(public router: Router, private http: HttpClient) {
    this.dataStore = DataStore.getInstance();
  }

  gotoDashboard() {
    this.router.navigate(['/universal/dashboard']);
  }
  gotoUserDetails() {
    this.router.navigate(['/universal/userdetails']);
  }
  gotoEmpDetails() {
    this.router.navigate(['/universal/empdetails']);
  }
  logout(){

    this.http.get("../logout/").subscribe((res: any) => {
    
        this.dataStore.clearAll();
        this.router.navigate(['/login']);
      
    });
  }

  ngOnInit() {
  }

}
