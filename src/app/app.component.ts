import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { localKeys } from './core/constants/localStorage.keys';
import { ApiService } from './core/services';
import { FormService } from './core/services/form/form.service';
import { LocalStorageService } from './core/services/local-storage/local-storage.service';
import { UserService } from './core/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslateService, private localStorage: LocalStorageService, private userService: UserService, private apiService: ApiService, private form: FormService) {
    this.initializeApp();
  }

  initializeApp() {
    this.setHttpHeaders().then(() => {
      this.languageSetting();
      this.isFormsUpdated();
    })
  }
  isFormsUpdated() {
    this.localStorage.getLocalData(localKeys.FORM_VERSIONS).then((localVersions) => {
      if (localVersions.length) {
        this.form.getFormVersionsFromAPI(JSON.parse(localVersions))?.subscribe();
      }
    })
  }

  async setHttpHeaders() {
    await this.apiService.setHeader();
    this.userService.userEventEmitted$.subscribe(async () => {
      await this.apiService.setHeader();
    })
  }

  languageSetting() {
    this.localStorage.getLocalData(localKeys.SELECTED_LANGUAGE).then(data => {
      if (data) {
        this.translate.use(data);
      } else {
        this.setLanguage('en');
      }
    }).catch(error => {
      this.setLanguage('en');
    })
  }

  setLanguage(lang: string) {
    this.localStorage.saveLocalData(localKeys.SELECTED_LANGUAGE, lang).then(data => {
      this.translate.use(lang);
    }).catch(error => {
      this.translate.use(lang)
    })
  }
}
