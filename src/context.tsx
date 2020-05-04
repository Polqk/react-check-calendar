import * as React from 'react';
import { CheckCalendarContext } from "./types";
import {defaultContext} from "./defaults";

const CheckContext = React.createContext<CheckCalendarContext>(defaultContext);
export const CheckContextProvider = CheckContext.Provider;
export default CheckContext;
