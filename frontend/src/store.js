import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import agendamentoReducer from "./slices/agendamentoSlice";
import pacienteReducer from "./slices/pacienteSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    agendamentos: agendamentoReducer,
    pacientes: pacienteReducer,
  },
});