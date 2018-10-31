import { Component, OnInit, OnDestroy } from '@angular/core';
import { YeomanState, APPS_SELECTOR } from '@app/core/redux';
import { Observable, Subject } from 'rxjs';
import { GeneratorService, GeneratorType } from '@app/providers/generator/generator.service';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { App } from '@app/models';

@Component({
  selector: 'app-generator-app',
  templateUrl: './generator-app.component.html',
  styleUrls: ['./generator-app.component.scss']
})
export class GeneratorAppComponent implements OnDestroy {
  yeomanState$: Observable<YeomanState>;
  appsState$: Observable<Array<App>>;
  private unsubscribe$: Subject<void> = new Subject<void>();                  // unsubscribe subject for canceling subscriptions on service destroy
  generatorIsInstalled = false;
  generatorRan = false;
  selectedApp : App;
  dependencyInstallation = "";

  constructor(
    private generatorService: GeneratorService,
    private store: Store<any>
  ) {
    this.generatorService.setGeneratorType(GeneratorType.APP);
    this.yeomanState$ = this.store.pipe(select(s => s.yeoman));
    this.appsState$ = this.store.pipe(select(s => s[APPS_SELECTOR]));

    this.yeomanState$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(state => {
        this.generatorIsInstalled = this.generatorService.getGeneratorIsInstalled();
      });
  }

  clearAppSelection(){
    this.selectedApp = null;
  }


  beginAppGenerator() {
    this.generatorRan = true;
    this.generatorService.beginAppGenerator(this.selectedApp,this.dependencyInstallation);
  }

  ngAfterContentInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
