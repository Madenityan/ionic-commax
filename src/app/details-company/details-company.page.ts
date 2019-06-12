import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-details-company',
  templateUrl: './details-company.page.pug',
  styleUrls: ['./details-company.page.scss'],
})
export class DetailsCompanyPage implements OnInit {

  public company;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log(this.router.getCurrentNavigation());
      if (this.router.getCurrentNavigation().extras.state) {
        this.company = this.router.getCurrentNavigation().extras.state.company;
      }
    });
  }

  ngOnInit() {}
}
