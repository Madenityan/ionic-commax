import {Component, OnInit} from '@angular/core';
import {CompaniesService} from '../services/companies.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.pug',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listCompanies = [];
  numberPerPage = 5;
  currentPage = 0;
  allCompanies;

  constructor(private companiesService: CompaniesService, private storage: Storage) {
    this.allCompanies = this.companiesService.getSavedCompany();
  }

  ngOnInit() {
    this.addId();
    this.loadNextPage();
  }

  addId() {
    const i = 0;
    this.allCompanies.forEach((item, index) => {
      item.id = index + 1;
    });
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

  removeCompany(id) {
    const index = this.allCompanies.findIndex(company => company.id === id);
    if (index > -1) {
      this.allCompanies.splice(index, 1);
    }
    this.storage.set('сompanies', this.allCompanies).then(res => {
      this.listCompanies = [];
      this.currentPage = 0;
      this.loadNextPage();
    });
  }
}
