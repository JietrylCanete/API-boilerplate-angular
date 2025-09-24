import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { Account } from '@app/_models';

interface AccountUI extends Account {
  isDeleting?: boolean;
}

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  accounts: AccountUI[] = [];
  error: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAll()
      .pipe(first())
      .subscribe({
        next: (accounts) => this.accounts = accounts,
        error: (err) => this.error = err.message || 'Failed to load accounts'
      });
  }

  addAccount() {
    this.router.navigate(['/accounts/add']);
  }

  editAccount(id: number) {
  this.router.navigate(['/accounts/edit', id]);
}

deleteAccount(id: number) {
  const account = this.accounts.find(x => x.id === id);
  if (!account) return;

  (account as any).isDeleting = true;

  this.accountService.delete(id)   // 👈 ensure delete accepts number
    .pipe(first())
    .subscribe({
      next: () => this.accounts = this.accounts.filter(x => x.id !== id),
      error: (err) => this.error = err.message || 'Failed to delete account'
    });
}
}
