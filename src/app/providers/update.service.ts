import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { CommonService } from './common/common.service';
import { Version } from '@app/models/Version';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Store } from '@ngrx/store';
import { SetGeneratorLatestVersionAction } from '@app/core/redux';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private modalService: NgxSmartModalService,
    private store: Store<any>
  ) { }

  checkForAppLatestVersion() {
    this.http.get('https://www.jasonbase.com/things/l4ze.json').subscribe(
      val => {
        const version = this.commonService.deserialize<Version>(val, Version);
        if (version !== environment.version) {
          this.modalService.getModal('updateModal').setData(version);
          this.modalService.open('updateModal');
        }
      },
      err => console.error(err)
    );
  };

  checkForLatestGeneratorVersion() {
    this.http.get('https://registry.npmjs.org/generator-wilbur').subscribe(
      val => {
        this.store.dispatch(new SetGeneratorLatestVersionAction({
          version: val['dist-tags'].latest
        }));
      },
      err => console.error(err)
    );
  }

}
