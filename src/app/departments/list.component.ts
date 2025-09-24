import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DepartmentService } from '@app/_services';
import { Department } from '@app/_models';

@Component({
    templateUrl: 'list.component.html'
})
export class DepartmentListComponent implements OnInit {
    departments!: Department[];
    loading = true;

    constructor(private departmentService: DepartmentService) { }

    ngOnInit(): void {
        this.departmentService.getAll()
            .pipe(first())
            .subscribe(departments => {
                this.departments = departments;
                this.loading = false;
            });
    }

    deleteDepartment(id: number): void {
        // Add a confirmation dialog before deleting
        if (confirm('Are you sure you want to delete this department?')) {
            const department = this.departments.find(x => x.id === id);
            if (!department) return;

            // This is a common pattern to show a loading spinner on the delete button
            department.isDeleting = true; 

            this.departmentService.delete(id)
                .pipe(first())
                .subscribe(() => {
                    this.departments = this.departments.filter(x => x.id !== id);
                });
        }
    }
}