import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'rpr-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  themes: string[] = ['theme-red', 'theme-purple']

  constructor(private settingService: SettingService) { }

  ngOnInit() {
  }

  changeTheme(theme: string) {
    this.settingService.colorTheme = theme;
  }

}
