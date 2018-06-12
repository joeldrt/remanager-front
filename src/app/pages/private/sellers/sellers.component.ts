import { Component, OnInit } from '@angular/core';
import {AccountService, SellersService} from '../../../_services';
import { User } from '../../../_models';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  currentAccount: User;
  sellers: User[];

  constructor(
    private sellersService: SellersService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    if (!this.currentAccount) {
      this.accountService.getAccount()
        .subscribe(
          (user) => {
            this.currentAccount = user;
            this.loadSellers();
          },
          (error) => {
            console.log(error);
          });
    }
  }

  loadSellers(search?: string) {
    if (!search || search === '') {
      this.sellersService.getAll().subscribe(
        (response) => {
          this.sellers = response.body;
        },
        (error) => {
          console.log(error);
        });
    }
  }

}
