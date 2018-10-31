import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { GeneratorService, GeneratorType } from '@app/providers/generator/generator.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { YeomanState } from '@app/core/redux';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-generator-boilerplate',
  templateUrl: './generator-boilerplate.component.html',
  styleUrls: ['./generator-boilerplate.component.scss'],
  providers: [GeneratorService]
})
export class GeneratorBoilerplateComponent implements AfterContentInit, OnDestroy {
  yeomanState$: Observable<YeomanState>;
  private unsubscribe$: Subject<void> = new Subject<void>();                  // unsubscribe subject for canceling subscriptions on service destroy
  generatorIsInstalled = false;
  generatorRan = false;
  dependencyInstallation = "";

  constructor(
    private generatorService: GeneratorService,
    private store: Store<any>
  ) {
    this.generatorService.setGeneratorType(GeneratorType.BOILERPLATE);
    this.yeomanState$ = this.store.pipe(select(s => s.yeoman));
    this.yeomanState$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(state => {
        this.generatorIsInstalled = this.generatorService.getGeneratorIsInstalled();
      });

  }

  beginBoilerplateGenerator() {
    this.generatorRan = true;
    this.generatorService.beginBoilerplateGenerator(this.dependencyInstallation)
  }

  ngAfterContentInit(): void {
    console.log(this.generatorService.boilerplateService.getBoilerPlateApp());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
