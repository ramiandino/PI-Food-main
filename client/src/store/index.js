import { createStore, applyMiddleware } from "redux"; //el applyMiddleware sirve para poder hacer peticiones a la api.
import { composeWithDevTools } from "redux-devtools-extension"; //sirve para hacer la conexion con la extension del navegador.
import thunkMiddleware from "redux-thunk"; // hacer peticiones a la api.
import rootReducer from "../reducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)) //esta linea me sirve para poder hacer peticiones a la api.
);
