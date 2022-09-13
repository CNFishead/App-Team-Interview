import { Component, OnInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'app/services/data.service';
import { IAccount } from 'app/types/i-accounts';
import { ITransaction } from 'app/types/i-transactions';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    animations: []
})
export class AccountComponent implements OnInit {
    public accountColumns: string[] = ['Id', 'Limit', 'Products', 'Details'];
    transactionColumns: string[] = ['Date', 'Amount', 'Transaction Code', 'Symbol', 'Price', 'Total'];
    public accountData: IAccount[]
    public accountTransactions: ITransaction[] = [];
    accountId: number;

    constructor(private _dataService: DataService) { }

    ngOnInit() {
        this.accountData = [];
        this.fetchAccountData();
    }


    private fetchAccountData() {
        this._dataService.getAccounts().subscribe(accounts => { 
            this.accountData = accounts;
        })
    }
    setAccountId(id: number) {
        this.accountId = id;
        this.fetchAccountTransactions(id);
    }

    private fetchAccountTransactions(id: number) {
        console.log(id)
        this._dataService.getSingleAccountTransactions(id).subscribe(account => {
            this.accountTransactions = account.transactions;
        })
        console.log(this.accountTransactions)
    }
    
}
