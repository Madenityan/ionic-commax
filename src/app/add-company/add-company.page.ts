import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {ActionSheetController, NavController} from '@ionic/angular';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import { Storage } from '@ionic/storage';
import {CompaniesService} from '../services/companies.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.page.pug',
  styleUrls: ['./add-company.page.scss'],
})
export class AddCompanyPage implements OnInit {

    public addCompanyForm: FormGroup;
    photo = '';
    allCompanies;

    constructor(private formBuilder: FormBuilder,
                private camera: Camera,
                private imagePicker: ImagePicker,
                public actionSheetController: ActionSheetController,
                private storage: Storage,
                private companiesService: CompaniesService,
                private navController: NavController) {
    }

  ngOnInit() {
      this.addCompanyForm = this.formBuilder.group({
          name: [, [Validators.required]],
          city: [, [Validators.required]],
          address: [, [Validators.required]],
          image: [, [Validators.required]]
      });
  }

    async openActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Add photo',
            buttons: [{
                text: 'Gallery',
                role: 'destructive',
                icon: 'images',
                handler: () => {
                    this.addImage();
                }
            }, {
                text: 'Camera',
                icon: 'camera',
                handler: () => {
                    this.addPhoto();
                }
            }]
        });
        await actionSheet.present();
    }

    addPhoto() {
        const options: CameraOptions = {
            quality: 25,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then((imageData) => {
                this.photo = 'data:image/jpeg;base64,' + imageData;
                this.addCompanyForm.controls.image.setValue(this.photo);
            },
            (err) => {
                console.error(err);
            });
    }

    addImage() {
        const options = {
            maximumImagesCount: 1,
            minWidth: 200,
            quality: 25,
            outputType: 1
        };
        this.imagePicker.getPictures(options).then((results) => {
            this.photo = 'data:image/jpeg;base64,' + results;
            this.addCompanyForm.controls.image.setValue(this.photo);
        }, (err) => {
                console.error(err);
        });
    }

  addCompany() {
    this.storage.get('companies').then(data => {
      this.allCompanies = data;
      const company = this.addCompanyForm.value;
      const lastElement = this.allCompanies[this.allCompanies.length - 1];
      company.id = (lastElement && lastElement.id) ? lastElement.id + 1 : this.allCompanies.length + 1;
      this.allCompanies.push(company);
      this.storage.set('companies', this.allCompanies).then(res => {
        console.log('added');
      });
      this.addCompanyForm.reset();
      this.navController.navigateBack('home');
    });
  }
}
