import { YeomanGeneratorQuestion } from './../models/YeomanGeneratorQuestion';
import {
  SetInstalledGeneratorsAction,
  SetGeneratorPromptQuestionsAction,
  InitializeYeomanStateAction,
  SetSelectedDirectoryPathAction,
  FileWrittenAction,
  DetectGeneratorInstallAction
} from '@redux/reducers';
import { CommonService } from './common/common.service';
import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { Store } from '@ngrx/store';
import { YeomanGenerator } from '@app/models/YeomanGenerator';
import { Router } from '@angular/router';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  dataStore: any;

  BrowserEvents = {
    'generator:installed-generators': 'generatorsDataReceived',
    'generator:prompt-questions': 'questionPrompt',
    'generator:install': 'generatorInstall',
    'generator:done': 'generatorDone',
    'generator:directory-selected': 'folderSelected',
    'generator:file-written': 'fileWritten',
    'generator:error': 'error',
    'abort': 'abort'
  };



  constructor(private store: Store<any>, private commonService: CommonService, private router: Router) {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      const Store = require('electron-store');
      this.dataStore = new Store();

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      Object.keys(this.BrowserEvents).forEach((event) => {
        this.ipcRenderer.on(event, (e, data) => {
          if (event === 'generator:installed-generators')
            this.setInstalledGenerators(data);
          else if (event === 'generator:prompt-questions')
            this.promptQuestions(data);
          else if (event === 'generator:done')
            this.completeGenerator(data);
          else if (event === 'generator:directory-selected')
            this.setDirectoryPath(data);
          else if (event === 'generator:file-written')
            this.setFileWritten(data);
          else if (event === 'generator:install')
            this.detectGeneratorInstalling();
          else if (event === 'abort')
            this.abort();


          console.log(event, data);
        });
      });
    }
  }


  openBrowserWindow(href: string) {
    this.remote.shell.openExternal(href);
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  initializeYeomanState() {
    this.ipcRenderer.send('context-generator', 'generator:init');
  }

  setInstalledGenerators(data: any) {
    const generators = this.commonService.deserializeArray<YeomanGenerator>(data, YeomanGenerator);
    this.store.dispatch(new SetInstalledGeneratorsAction({ installedGenerators: generators }));
  }

  promptDirectoryPath() {
    this.ipcRenderer.send('context-generator', 'generator:open-dialog');
  }

  setDirectoryPath(data: string) {
    this.store.dispatch(new SetSelectedDirectoryPathAction({ selectedDirectoryPath: data }));
  }

  setFileWritten(data: any) {
    if (data === true)
      this.store.dispatch(new FileWrittenAction({ fileWritten: true }));
    else
      console.error('there was an error writing the file');
  }

  runSelectedGenerator(selectedGeneratorName: string, selectedDirectoryPath: string) {
    this.ipcRenderer.send('context-generator', 'generator:run', selectedGeneratorName, selectedDirectoryPath);
  }

  promptQuestions(data: any) {
    const questions = this.commonService.deserializeArray<YeomanGeneratorQuestion>(data, YeomanGeneratorQuestion);
    this.store.dispatch(new SetGeneratorPromptQuestionsAction({ promptQuestions: questions }));
  }

  submitAnswers(answers: object) {
    this.ipcRenderer.send('context-generator', 'generator:prompt-answer', answers);
  }

  writeFile(directory: string, fileName: string, contents: any) {
    this.ipcRenderer.send('context-generator', 'generator:write-file', {
      filePath: directory + '/' + fileName, // TODO : not hardcode this
      contents: contents
    });
  }

  completeGenerator(data: any) {
    this.router.navigate(['/']);
    // allow time for route transition
    setTimeout(() => {
      this.store.dispatch(new InitializeYeomanStateAction());
      alert(`Generator has completed. Your project has been generated at ${data}.`);
    }, 500);

  }

  abort() {
    this.store.dispatch(new InitializeYeomanStateAction());
    this.router.navigate(['/']);
  }

  detectGeneratorInstalling() {
    this.store.dispatch(new DetectGeneratorInstallAction());
  }

}
