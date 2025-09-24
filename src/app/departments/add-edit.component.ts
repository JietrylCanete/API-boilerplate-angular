// src/app/departments/add-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DepartmentService } from '@app/_services/department.service';
import { AlertService } from '@app/_services/alert.service';

@Component({
  templateUrl: 'add-edit.component.html'
})
export class DepartmentAddEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode = true;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      status: ['Active'] // 👈 added so backend won’t complain if status is required
    });

    if (!this.isAddMode) {
      this.loading = true;
      this.departmentService
        .getById(this.id)
        .pipe(first())
        .subscribe({
          next: department => {
            this.form.patchValue(department);
            this.loading = false;
          },
          error: err => {
            this.alertService.error(err);
            this.loading = false;
          }
        });
    }
  }

  // easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) return;

    this.submitting = true;
    this.isAddMode ? this.createDepartment() : this.updateDepartment();
  }

  private createDepartment(): void {
    this.departmentService
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('✅ Department created successfully', {
            keepAfterRouteChange: true
          });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      });
  }

  private updateDepartment(): void {
    this.departmentService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('✅ Update successful', {
            keepAfterRouteChange: true
          });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      });
  }
}
