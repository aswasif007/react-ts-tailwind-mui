import { Dispatch, createContext, useReducer } from 'react';
import { BaseResource } from '../resources';
import { Dict } from '../types';

enum StoreActionType {
  Upsert = 'UPSERT',
}

interface IAction {
  type: StoreActionType;
  target: string;
  payload: any;
}

interface IDataContext {
  dispatch: Dispatch<IAction>;
  state: Dict<Dict<BaseResource<any>>>;
}

const initialState = {
  UserResource: {},
};

function reducerFn(state: any, action: IAction) {
  const newState = { ...state };

  if (action.type === StoreActionType.Upsert) {
    if (!Object.hasOwn(initialState, action.target)) {
      throw new Error(`Unknown target ${action.target}`);
    }

    const id = action.payload.id;
    if (!id) {
      throw new Error('Missing id in payload');
    }

    newState[action.target][id] = action.payload;
  }

  return newState;
}

const DataContext = createContext({});

type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  BaseResource.setStore({ state, dispatch });

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider, StoreActionType };
export type { IDataContext };
