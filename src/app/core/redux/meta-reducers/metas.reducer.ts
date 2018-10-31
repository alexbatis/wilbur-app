/*-----------------------------------IMPORTS---------------------------------*/
/*--------------------THIRD PARTY-------------------*/
import { MetaReducer, ActionReducer, State } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
// import { FormGroupState } from 'ngrx-forms'; // TODO: make class/interface to model FormGroupState as json2typescript deserializeable
/*--------------------CUSTOM------------------------*/
import { environment } from '@env/environment';
import { CommonService } from '@providers/common/common.service';
import { Class, App } from '@models/index';
import { debugMetaReducer } from './debug.reducer';
import { electronStoreMetaReducer } from './electron-store.reducer';

/*--------------------CONSTANTS---------------------*/
const commonService = new CommonService();

/*--------------------FUNCTIONS-------------------*/
/* Deserializes JSON from store into an array of Class objects  */
function classesDeserializer(storedState: any): Array<any> {
  return commonService.deserializeArray<Class>(storedState, Class);
}

/* Deserializes JSON from store into an array of App objects  */
function appsDeserializer(storedState: any): Array<any> {
  return commonService.deserializeArray<App>(storedState, App);
}

/* Saves state to local storage, initializes state from local storage on page load  */
function localStorageSyncReducer(reducer: ActionReducer<State<any>>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      { classes: { deserialize: classesDeserializer } },
      { apps: { deserialize: appsDeserializer } },
      { classForm: {} },
      { appForm: {} },
      // { yeoman : {} }
      // { configurationForm: {} }
    ],
    rehydrate: true,
    removeOnUndefined: true
  })(reducer);
}

// Array of meta all reducers, include debug if environment specifies
export const metaReducers: MetaReducer<any>[] = [];
if (environment.debug)
  metaReducers.unshift(debugMetaReducer);

metaReducers.unshift(electronStoreMetaReducer);
// metaReducers.unshift(localStorageSyncReducer);


