import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Job } from "../../tools/interfaces/job";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: Array<Job>;
  initialJobs: Array<Job>;
  form: UntypedFormGroup;
  constructor(private app: AppService) { }
  ngOnInit() {
    this.getJobs();
    this.form = new UntypedFormGroup({
      filter: new UntypedFormControl(null, Validators.required),
    });
  }
  getJobs() {
    this.app.get('jobs').subscribe(data => {
      if (data) {
        this.jobs = data['jobs'];
        this.initialJobs = data['jobs'];
      }
    });
  }
  createJob() {
    this.app.post('jobs/create', {name: 'first job'}).subscribe(res => {
      console.log(res);
    });
  }
  updateJob(id) {
    this.app.post('jobs/update', {}).subscribe(res => {
      console.log(res);
    });
  }
  deleteJob(id) {
    this.app.delete('jobs', id).subscribe(res => {
      console.log(res);
    });
  }
  handleFilter() {
    console.log(this.form);
    const { value: { filter } } = this.form;
    this.initialJobs = this.jobs.filter(el => el.location.toLowerCase().includes(filter));
    if (this.initialJobs.length === 0) {
      this.initialJobs = this.jobs;
    }
  }
}
