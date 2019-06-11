import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class CompaniesService {

  constructor(private storage: Storage) {}

  private companies = [
    {
      name: 'קומקס',
      city: 'חולון',
      address: 'החורטים 11',
      latitude: '32.0286543',
      longitude: '34.7942146',
      image: '../../assets/images/company-1.jpg'
    },
    {
      name: 'מייקרוסופט' ,
      city: 'הרצליה' ,
      address: 'אריה שנקר 13',
      latitude: '32.1579889',
      longitude: '34.8085177',
      image: '../../assets/images/company-2.jpg'
    },
    {
      name: 'איי בי אם',
      city: 'הרצליה' ,
      address: 'ספיר 1',
      latitude: '32.1645242',
      longitude: '34.812074',
      image: '../../assets/images/company-3.jpg'
    },
    {
      name: 'גוגל ישראל',
      city: 'תל אביב',
      address: 'יגאל אלון 98',
      latitude: '32.0700544',
      longitude: '34.7941211',
      image: '../../assets/images/company-1.jpg'
    },
    {
      name: 'וויקס',
      city: 'תל אביב',
      address: 'נמל תל אביב 36',
      latitude: '32.0966416',
      longitude: '34.7731584',
      image: '../../assets/images/company-2.jpg'
    },
    {
      name: 'תנובה',
      city: 'רחובות',
      address: 'יצחק פניגר 2',
      latitude: '31.8976218',
      longitude: '34.7964478',
      image: '../../assets/images/company-3.jpg'
    },
    {
      name: 'תנובה',
      city: 'רחובות',
      address: 'יצחק פניגר 2',
      latitude: '31.8976218',
      longitude: '34.7964478',
      image: '../../assets/images/company-1.jpg'
    },
    {
      name: 'תנובה',
      city: 'רחובות',
      address: 'יצחק פניגר 2',
      latitude: '31.8976218',
      longitude: '34.7964478',
      image: '../../assets/images/company-2.jpg'
    },
    {
      name: 'סימילר ווב',
      city: 'תל אביב',
      address: 'דרך מנחם בגין 23',
      latitude: '32.063696',
      longitude: '34.7792026',
      image: '../../assets/images/company-3.jpg'
    },
    {
      name: 'פידווייזר',
      city: 'רמת גן',
      address: 'דרך זאב זבוטינסקי 2',
      latitude: '32.08213',
      longitude: '34.8007846',
      image: '../../assets/images/company-1.jpg'
    },
    {
      name: 'בנק הפועלים',
      city: 'ראשון לציון',
      address: 'רוטשילד 13',
      latitude: '32.0268071',
      longitude: '34.7434831',
      image: '../../assets/images/company-2.jpg'
    },
    {
      name: 'פוקס ויזל',
      city: 'לוד',
      address: 'החרמון 6',
      latitude: '32.1962827',
      longitude: '34.8484072',
      image: '../../assets/images/company-3.jpg'
    },
  ];

    getSavedCompany() {
      this.storage.set('сompanies', this.companies);
      return this.companies;
    }
}
