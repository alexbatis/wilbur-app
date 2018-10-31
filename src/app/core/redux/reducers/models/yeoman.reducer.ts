/*--------------------IMPORTS-------------------------------------------*/
import { Action } from '@ngrx/store'; // NgRx
import { YeomanGenerator } from '@app/models/YeomanGenerator';
import { YeomanGeneratorQuestion } from '@app/models/YeomanGeneratorQuestion';
import { App } from '@app/models/App/App';

/*--------------------ACTION TYPES--------------------------------------*/
export enum YeomanActionTypes {
    INITIALIZE_STATE = '[Yeoman] Initialize State',
    GET_INSTALLED_GENERATORS = '[Yeoman] Get Installed Generators',
    SET_INSTALLED_GENERATORS = '[Yeoman] Set Installed Generators',
    SET_SELECTED_GENERATOR = '[Yeoman] Set Selected Generator',
    PROMPT_DIRECTORY_PATH = '[Yeoman] Prompt directory path',
    SET_SELECTED_DIRECTORY_PATH = '[Yeoman] Set selected directory path',
    WRITE_FILE = '[Yeoman] Write file',
    FILE_WRITTEN = '[Yeoman] Confirm file written',
    RUN_SELECTED_GENERATOR = '[Yeoman] Run Selected Generator',
    SET_GENERATOR_PROMPT_QUESTIONS = '[Yeoman] Set Generator Prompt Questions',
    SUBMIT_GENERATOR_PROMPT_ANSWERS = '[Yeoman] Set Generator Prompt Answers',
    DETECT_GENERATOR_INSTALLING = '[Yeoman] Detect Generator Installing',
    SET_GENERATOR_LATEST_VERSION = '[Yeoman] Set generator latest version',
}

/*--------------------ACTION TYPE CLASSES-------------------------------*/
export class InitializeYeomanStateAction implements Action {
    readonly type = YeomanActionTypes.INITIALIZE_STATE;
    constructor(public payload?: { initialYeomanState: YeomanState }) { }
}
export class GetInstalledGeneratorsAction implements Action {
    readonly type = YeomanActionTypes.GET_INSTALLED_GENERATORS;
}

export class SetInstalledGeneratorsAction implements Action {
    readonly type = YeomanActionTypes.SET_INSTALLED_GENERATORS;
    constructor(public payload: { installedGenerators: Array<YeomanGenerator> }) { }
}

export class SetSelectedGeneratorAction implements Action {
    readonly type = YeomanActionTypes.SET_SELECTED_GENERATOR;
    constructor(public payload: { selectedGenerator: YeomanGenerator }) { }
}

export class PromptDirectoryPathAction implements Action {
    readonly type = YeomanActionTypes.PROMPT_DIRECTORY_PATH;
}

export class SetSelectedDirectoryPathAction implements Action {
    readonly type = YeomanActionTypes.SET_SELECTED_DIRECTORY_PATH;
    constructor(public payload: { selectedDirectoryPath: string }) { }
}

export class WriteFileAction implements Action {
    readonly type = YeomanActionTypes.WRITE_FILE;
    constructor(public payload: { fileContents: any, fileName: string }) { }
}

export class FileWrittenAction implements Action {
    readonly type = YeomanActionTypes.FILE_WRITTEN;
    constructor(public payload: { fileWritten: boolean }) { }
}

export class RunSelectedGeneratorAction implements Action {
    readonly type = YeomanActionTypes.RUN_SELECTED_GENERATOR;
}

export class SetGeneratorPromptQuestionsAction implements Action {
    readonly type = YeomanActionTypes.SET_GENERATOR_PROMPT_QUESTIONS;
    constructor(public payload: { promptQuestions: Array<YeomanGeneratorQuestion> }) { }
}

export class SubmitGeneratorPromptAnswersAction implements Action {
    readonly type = YeomanActionTypes.SUBMIT_GENERATOR_PROMPT_ANSWERS;
    constructor(public payload: { answers: object }) { }
}

export class DetectGeneratorInstallAction implements Action {
    readonly type = YeomanActionTypes.DETECT_GENERATOR_INSTALLING;
    constructor(public payload?: { isInstalling: boolean }) { }
}

export class SetGeneratorLatestVersionAction implements Action {
    readonly type = YeomanActionTypes.SET_GENERATOR_LATEST_VERSION;
    constructor(public payload: { version: string }) { }
}


/*--------------------ACTION TYPE IMPLEMENTATION------------------------*/
export type YeomanActions =
    | InitializeYeomanStateAction
    | GetInstalledGeneratorsAction
    | SetInstalledGeneratorsAction
    | SetSelectedGeneratorAction
    | SetSelectedDirectoryPathAction
    | WriteFileAction
    | FileWrittenAction
    | RunSelectedGeneratorAction
    | SetGeneratorPromptQuestionsAction
    | SubmitGeneratorPromptAnswersAction
    | DetectGeneratorInstallAction
    | SetGeneratorLatestVersionAction;

/*--------------------INITIAL STATE DEFINITION--------------------------*/
export const YEOMAN_SELECTOR = 'yeoman';
export interface YeomanState {
    installedGenerators: {
        loading: boolean,
        value: Array<YeomanGenerator>
    };
    generatorLatestVersion: string;
    selectedDirectoryPath: string;
    selectedGenerator: YeomanGenerator;
    promptQuestions: Array<YeomanGeneratorQuestion>;
    fileWritten: boolean;
    promptAnswers: object;
    generatorInstalling: boolean;
    generatorRunning: boolean;
}
export const initialYeomanState: YeomanState = {
    installedGenerators: {
        loading: true,
        value: []
    },
    selectedDirectoryPath: null,
    selectedGenerator: null,
    promptQuestions: null,
    fileWritten: false,
    promptAnswers: {},
    generatorLatestVersion: null,
    generatorInstalling: false,
    generatorRunning: false
};

/*--------------------REDUCER-------------------------------------------*/
export function yeomanReducer(
    state = initialYeomanState,
    action: YeomanActions
): YeomanState {
    switch (action.type) {
        case YeomanActionTypes.INITIALIZE_STATE:
            return action.payload ? action.payload.initialYeomanState : initialYeomanState;
        case YeomanActionTypes.SET_SELECTED_GENERATOR:
            return {
                ...state,
                selectedGenerator: action.payload.selectedGenerator
            };
        case YeomanActionTypes.SET_INSTALLED_GENERATORS:
            return {
                ...state,
                installedGenerators: {
                    loading: false,
                    value: action.payload.installedGenerators
                }
            };
        case YeomanActionTypes.SET_SELECTED_DIRECTORY_PATH:
            return {
                ...state,
                selectedDirectoryPath: action.payload.selectedDirectoryPath
            };
        case YeomanActionTypes.FILE_WRITTEN:
            return {
                ...state,
                fileWritten: action.payload.fileWritten
            };
        case YeomanActionTypes.SET_GENERATOR_PROMPT_QUESTIONS:
            return {
                ...state,
                promptQuestions: action.payload.promptQuestions,
                generatorRunning: false
            };
        case YeomanActionTypes.SUBMIT_GENERATOR_PROMPT_ANSWERS:
            return {
                ...state,
                promptAnswers: action.payload.answers,
                generatorRunning: true
            };
        case YeomanActionTypes.RUN_SELECTED_GENERATOR:
            return {
                ...state,
                generatorRunning: true
            };
        case YeomanActionTypes.DETECT_GENERATOR_INSTALLING:
            return {
                ...state,
                generatorInstalling: true
            };
        case YeomanActionTypes.SET_GENERATOR_LATEST_VERSION:
            return {
                ...state,
                generatorLatestVersion : action.payload.version
            };
        default:
            return state;
    }
}
