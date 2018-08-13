import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

// API_URL
import { environment } from '../../../../environments/environment';

// servicios
import {
  AccountService,
  ToasterService,
  UserExtraService,
} from '../../../_services';
import { FileService } from '../../../_dgtools_services';

// modelos
import {
  User,
  UserExtra,
  ImageEnvelope,
} from '../../../_models';

// helpers
import {
  ProfileHelper,
} from '../../../_helpers';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @ViewChild('image_input_field') image_input_field: ElementRef;

  public user: User;
  public isEditing: boolean;
  public loading: boolean;

  public userExtra: UserExtra;
  public uploading_images: boolean;
  public image_envelopes: ImageEnvelope[];
  public userProfilePictureChange: boolean;
  public lastProfilePicBeforeChange: string;

  public api_url = environment.API_URL;

  constructor(
    private accountService: AccountService,
    private toasterService: ToasterService,
    private profileHelper: ProfileHelper,
    private userExtraService: UserExtraService,
    private fileService: FileService,
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.userProfilePictureChange = false;
    this.getAccount();
  }// end - ngOnInit

  // --- Functions

  editForm() {
    this.isEditing = true;
  }

  cancelEdit() {
    if (!this.isEditing) {
      return;
    }
    this.isEditing = false;
    this.user = JSON.parse(localStorage.getItem('account'));
    if (this.userExtra && this.lastProfilePicBeforeChange && this.userProfilePictureChange) {
      this.userProfilePictureChange = false;
      this.userExtra.profilePictureUrl = this.lastProfilePicBeforeChange;
    }
  }

  saveForm() {
    this.accountService.updateAccount(this.user).subscribe(
      (success: HttpResponse<any>) => {
        if (success.status === 200) {
          this.getAccount();
          this.toasterService.success('Información actualizada');
          this.profileHelper.sendProfileChangeRequest(this.user.id);
          this.isEditing = false;
        } else {
          this.toasterService.error('Error: ' + success.statusText);
          this.isEditing = false;
        }
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error('Error: ' + error.message);
        this.isEditing = false;
      }
    );
    this.persistProfilePic();
  }// end - saveForm

  getAccount() {
    this.accountService.getAccount().subscribe(
      (response: HttpResponse<User>) => {
        this.user = response.body;
        this.getUserExtra();
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error(error.message);
        this.loading = false;
      });
  }// end - getAccount

  getUserExtra() {
    this.userExtraService.getUserExtra().subscribe(
      (response: HttpResponse<UserExtra>) => {
        if (response && response.body) {
          this.userExtra = response.body;
        } else {
          this.toasterService.error('No se pudo cargar la información extra del usuario');
        }
        this.lastProfilePicBeforeChange = this.getProfileImage();
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error(error.message);
        this.lastProfilePicBeforeChange = this.getProfileImage();
        this.loading = false;
      }
    );
  }

  getProfileImage() {
    if (!this.userExtra || !this.userExtra.profilePictureUrl
      || this.userExtra.profilePictureUrl === 'None') {
      return 'assets/img/imgPhotoProfile.png';
    }
    return this.userExtra.profilePictureUrl;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image_envelopes = new Array<ImageEnvelope>();
      for (let index = 0; index < event.target.files.length; index++) {
        const reader = new FileReader();
        const file = event.target.files[index];
        reader.readAsDataURL(file);
        reader.onload = () => {
          const image_envelope = new ImageEnvelope(
            file.name,
            file.type,
            reader.result.split(',')[1]
          );
          this.image_envelopes.push(image_envelope);
        };
      }
    }
  }

  uploadImages() {
    if (!this.image_envelopes || this.image_envelopes.length <= 0 || !this.user
      || !this.user.login) {
      return;
    }
    this.uploading_images = true;
    this.fileService.uploadFiles(this.user.login + '/fotos', this.image_envelopes).subscribe(
      (response: HttpResponse<any>) => {
        this.image_input_field.nativeElement.value = '';
        if (response && response.body && response.body.length > 0) {
          for (let index = 0; index < response.body.length; index++) {
            this.userExtra.picturesUrls.push(response.body[index]);
          }
          this.updateUserExtraPictures(this.userExtra.picturesUrls);
        } else {
          this.toasterService.error('El servidor no regresó información sobre los archivos guardados');
        }
        this.uploading_images = false;
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error(error.message);
        this.uploading_images = false;
      }
    );
  }

  private updateUserExtraPictures(picturesUrls: string[]) {
    this.userExtraService.updateUserExtraPicturesUrls(picturesUrls).subscribe(
      (response: HttpResponse<UserExtra>) => {
        if (response && response.body) {
          this.userExtra = response.body;
        } else {
          this.toasterService.warning('UserExtra - no se pudo actualizar en servidor');
        }
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error('UserExtra: ' + error.message);
      }
    );
  }

  changeProfilePic(profile_pic_url: string) {
    this.userExtra.profilePictureUrl = profile_pic_url;
    this.userProfilePictureChange = true;
  }

  persistProfilePic() {
    if (!this.userProfilePictureChange) {
      return;
    }
    this.userProfilePictureChange = false;
    this.userExtraService.changeProfilePicture(this.userExtra.profilePictureUrl).subscribe(
      (response: HttpResponse<UserExtra>) => {
        if (response && response.body) {
          this.userExtra = response.body;
          this.lastProfilePicBeforeChange = this.userExtra.profilePictureUrl;
        }
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error('Error al cambiar foto de perfil');
      }
    );
  }

}
