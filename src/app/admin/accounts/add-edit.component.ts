import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
            // password required only in add mode
            password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]],
            confirmPassword: ['']
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });

        this.title = this.id ? 'Edit Account' : 'Create Account';

        if (this.id) {
            // edit mode
            this.loading = true;
            this.accountService.getById(Number(this.id))
                .pipe(first())
                .subscribe({
                    next: (account) => {
                        this.form.patchValue(account);
                        this.loading = false;
                    },
                    error: (error) => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) return;

    this.submitting = true;

    const saveAccount = this.id
        ? () => this.accountService.update(Number(this.id), this.form.value)
        : () => this.accountService.create(this.form.value); // This still points to /accounts

    const message = this.id ? 'Account updated' : 'Account created';

    saveAccount()
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success(message, { keepAfterRouteChange: true });
                this.router.navigateByUrl('/admin/accounts');
            },
            error: (error) => {
                this.alertService.error(error);
                this.submitting = false;
            }
        });
}
}