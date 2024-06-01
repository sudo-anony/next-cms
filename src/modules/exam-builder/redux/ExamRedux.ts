import { Action } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CompleteExam } from '../models/models'; // Import only CompleteExam model

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  SetExam: '[Set Exam] Action',
  ClearExam: '[Clear Exam] Action',
  SetExamModulePath: '[Set Exam Module Path] Action'
};

const initialExamState: IExamState = {
  completeExam: undefined,
  path: '' // Initialize path if needed
};

export interface IExamState {
  completeExam?: CompleteExam;
  path?: string; // Add path to the state if needed
}

export const reducer = persistReducer(
  { storage, key: 'cms-exam', whitelist: ['completeExam', 'path'] },
  (state: IExamState = initialExamState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.SetExam: {
        const completeExam = action.payload as CompleteExam; // Adjust payload type
        return { ...state, completeExam };
      }
      case actionTypes.SetExamModulePath: {
        const path = action.payload as string; // Adjust payload type
        return {...state, path};
      }
      case actionTypes.ClearExam: { 
        return initialExamState;
      }
      default:
        return state;
    }
  }
);

export const actions = {
  setExam: (completeExam: CompleteExam) => ({
    type: actionTypes.SetExam,
    payload: completeExam,
  }),
  clearExam: () => ({ type: actionTypes.ClearExam }),
  setExamModulePath: (path: string) => ({ type: actionTypes.SetExamModulePath, payload: path }),
};
