import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CompaniesService} from '../services/companies.service';
import { Storage } from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';

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

  constructor(private companiesService: CompaniesService,
              private storage: Storage,
              private ref: ChangeDetectorRef,
              private navController: NavController) {
  }

  async ngOnInit() {
    await this.updateListData();
    this.loadNextPage();
  }

  async ionViewWillEnter() {
    await this.updateListData();
    this.resetPages();
  }

  private async updateListData() {
    this.allCompanies = await this.companiesService.getSavedCompany();
    this.ref.detectChanges();
  }

  private resetPages() {
    this.listCompanies = [];
    this.currentPage = 0;
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
    const allData = this.allCompanies;
    const offset = this.currentPage * this.numberPerPage;
    this.listCompanies = this.listCompanies.concat(allData.slice(offset, offset + this.numberPerPage));
    this.currentPage++;
  }

  removeCompany(event, id) {
    // event.stopPropagation();
    const index = this.allCompanies.findIndex(company => company.id === id);
    if (index > -1) {
      this.allCompanies.splice(index, 1);
    }
    this.storage.set('companies', this.allCompanies).then(res => {
      this.resetPages();
    });
  }

  removeAllItems() {
    this.storage.remove('companies').then(res => {
      this.listCompanies = [];
    });
  }

  exitApp() {
    navigator['app'].exitApp();
  }

  openDetails(company) {
    const navigationExtras: NavigationExtras = {
      state: {
        company
      }
    };
    this.navController.navigateForward(['details-company'], navigationExtras);
  }
}
