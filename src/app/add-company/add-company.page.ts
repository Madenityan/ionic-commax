import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.page.pug',
  styleUrls: ['./add-company.page.scss'],
})
export class AddCompanyPage implements OnInit {

    public addCompanyForm: FormGroup;
    photo = '';

  constructor(private formBuilder: FormBuilder, private camera: Camera) { }

  ngOnInit() {
      this.addCompanyForm = this.formBuilder.group({
          name: [, [Validators.required]],
          city: [, [Validators.required]],
          address: [, [Validators.required]],
          picture: [, [Validators.required]]
      });
  }

  addCompany() {
    console.log(this.addCompanyForm.value);
  }

    addImage() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then((imageData) => {
                this.photo = 'data:image/jpeg;base64' + imageData;
                this.addCompanyForm.controls.picture.setValue(this.photo);
            },
            (err) => {});

    }


}
