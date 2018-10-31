import { ActionReducer } from '@ngrx/store';
const Store = require('electron-store');
const dataStore = new Store();
import { CommonService } from '@providers/common/common.service';
import { Class, App } from '@app/models';

/*--------------------CONSTANTS---------------------*/
const commonService = new CommonService();


export function electronStoreMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        const newState = reducer(state, action);
        const Store = require('electron-store');
        const dataStore = new Store();

        const storedClasses = dataStore.get('state.classes') || null;
        const stateClasses = (newState) ? newState.classes : null;

        const storedApps = dataStore.get('state.apps') || null;
        const stateApps = (newState) ? newState.apps : null;


        if (storedClasses && storedClasses.length && !stateClasses)
            newState.classes = commonService.deserializeArray<Class>(storedClasses, Class);

        if (storedApps && storedApps.length && !stateApps)
            newState.apps = commonService.deserializeArray<App>(storedApps, App);


        dataStore.set('state', newState);
        return newState;
    };
}
