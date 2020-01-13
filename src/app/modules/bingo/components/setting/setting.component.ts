import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rpr-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  themes: string[] = ['theme-red', 'theme-purple', 'theme-green', 'theme-blue', 'theme-orange', 'theme-gray', 'theme-pink', 'theme-yellow'];
  isDarkTheme$: Observable<boolean>;

  constructor(private settingService: SettingService) {
    this.isDarkTheme$ === settingService.darkTheme$;
  }

  ngOnInit() {
  }

  changeTheme(theme: string) {
    this.settingService.colorTheme = theme;
  }

}
