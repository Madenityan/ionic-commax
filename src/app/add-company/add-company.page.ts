import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActionSheetController, NavController} from '@ionic/angular';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {Storage} from '@ionic/storage';
import {CompaniesService} from '../services/companies.service';
import {Geocoder, GeocoderResult, GoogleMap, GoogleMapOptions, GoogleMaps} from '@ionic-native/google-maps';

@Component({
    selector: 'app-add-company',
    templateUrl: './add-company.page.pug',
    styleUrls: ['./add-company.page.scss'],
})
export class AddCompanyPage implements OnInit {

    public addCompanyForm: FormGroup;
    photo = '';
    allCompanies;
    map: GoogleMap;
    public company: any = {
        longitude: '',
        latitude: '',
        address: '',
        name: '',
        city: '',
        id: '',
        image: ''
    };

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
        const mapOptions: GoogleMapOptions = {};
        this.map = GoogleMaps.create('add_location', mapOptions);
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
        const options: CameraOptions = {
            quality: 25,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then((results) => {
            this.photo = 'data:image/jpeg;base64,' + results;
            this.addCompanyForm.controls.image.setValue(this.photo);
        }, (err) => {
            console.error(err);
        });
    }

    getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }

    addCompany() {
        this.storage.get('companies').then(data => {
            this.allCompanies = data;
            console.log(data);
            const company: any = this.addCompanyForm.value;
            company.latitude = this.company.latitude;
            company.longitude = this.company.longitude;
            // const lastElement = this.allCompanies[this.allCompanies.length - 1];
            // company.id = (lastElement && lastElement.id) ? lastElement.id + 1 : this.allCompanies.length + 1;
            this.allCompanies.unshift(company);
            const lastCompanyId = this.getMaxOfArray(this.allCompanies.map(c => Number(c.id)));
            if (!company.id) {
                company.id = this.allCompanies.length ?
                    typeof lastCompanyId === 'string' ? (Number(lastCompanyId) + 1).toString() : (lastCompanyId + 1).toString() : '0';
            }
            this.storage.set('companies', this.allCompanies).then(res => {
                // console.log('added');
            });
            this.addCompanyForm.reset();
            this.navController.navigateBack('home');
        });
    }

    addMap(e) {
        console.log(e);
        this.company.address = e;
        Geocoder.geocode({
            address: this.addCompanyForm.get('city').value + this.addCompanyForm.get('address').value
        }).then((results: GeocoderResult[]) => {
            const position = results[0].position;
            this.company.latitude = position.lat.toString();
            this.company.longitude = position.lng.toString();
            console.log(position);
        });
    }
}
