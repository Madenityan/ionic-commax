import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../services/companies.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.pug',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listCompanies = [];
  numberPerPage = 5;
  currentPage = 0;

  constructor(private companiesService: CompaniesService) {}

  ngOnInit() {
    this.loadNextPage();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.loadNextPage();
      event.target.complete();
    }, 700);
  }

  loadNextPage() {
    const allData = this.companiesService.getSavedCompany();
    const offset = this.currentPage * this.numberPerPage;
    this.listCompanies = this.listCompanies.concat(allData.slice(offset, offset + this.numberPerPage));
    this.currentPage++;
  }
}
