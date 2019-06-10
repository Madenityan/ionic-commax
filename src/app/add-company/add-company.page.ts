import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {ActionSheetController} from '@ionic/angular';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.page.pug',
  styleUrls: ['./add-company.page.scss'],
})
export class AddCompanyPage implements OnInit {

    public addCompanyForm: FormGroup;
    photo = '';

    constructor(private formBuilder: FormBuilder,
                private camera: Camera,
                private imagePicker: ImagePicker,
                public actionSheetController: ActionSheetController,
                private storage: Storage) {
    }

  ngOnInit() {
      this.addCompanyForm = this.formBuilder.group({
          name: [, [Validators.required]],
          city: [, [Validators.required]],
          address: [, [Validators.required]],
          picture: [, [Validators.required]]
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

    addCompany() {
        console.log(this.addCompanyForm.value);
        this.storage.set('company', this.photo);
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
                this.addCompanyForm.controls.picture.setValue(this.photo);
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
        }, (err) => {
                console.error(err);
        });
    }
}
