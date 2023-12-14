import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const.ts';
import {uiSettingsSlice} from './ui-settings/ui-settings.slice.ts';
import {apiCommunicationSlice} from './api-communication/api-communication.slice.ts';
import {userPreferencesSlice} from './user-preferences/user-preferences.slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.SessionState]: uiSettingsSlice.reducer,
  [NameSpace.ApiCommunication]: apiCommunicationSlice.reducer,
  [NameSpace.UserPreferences]: userPreferencesSlice.reducer,
});
