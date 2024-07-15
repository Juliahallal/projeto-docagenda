import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agendamentoService from "../services/agendamentoService";

const initialState = {
  agendamentos: [],
  agendamento: null,
  error: false,
  success: false,
  loading: false,
  message: null,
};

// buscar todos os agendamentos
export const fetchAgendamentos = createAsyncThunk(
  "agendamento/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await agendamentoService.getAgendamentos();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// buscar um agendamento por ID
export const fetchAgendamento = createAsyncThunk(
  "agendamento/fetchById",
  async (id, thunkAPI) => {
    try {
      const data = await agendamentoService.getAgendamento(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// criar um novo agendamento
export const createAgendamento = createAsyncThunk(
  "agendamento/create",
  async (agendamentoData, thunkAPI) => {
    try {
      const data = await agendamentoService.createAgendamento(agendamentoData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// atualizar um agendamento
export const updateAgendamento = createAsyncThunk(
  "agendamento/update",
  async ({ id, agendamentoData }, thunkAPI) => {
    try {
      const data = await agendamentoService.updateAgendamento(id, agendamentoData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// deletar um agendamento
export const deleteAgendamento = createAsyncThunk(
  "agendamento/delete",
  async (id, thunkAPI) => {
    try {
      const data = await agendamentoService.deleteAgendamento(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// associar um paciente a um agendamento
export const associatePacienteToAgendamento = createAsyncThunk(
  "agendamento/associatePaciente",
  async ({ agendamentoId, pacienteId }, thunkAPI) => {
    try {
      const data = await agendamentoService.associatePacienteToAgendamento(agendamentoId, pacienteId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const agendamentoSlice = createSlice({
  name: "agendamento",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgendamentos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAgendamentos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.agendamentos = action.payload;
      })
      .addCase(fetchAgendamentos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAgendamento.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAgendamento.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.agendamento = action.payload;
      })
      .addCase(fetchAgendamento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAgendamento.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createAgendamento.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.agendamentos.push(action.payload);
        state.message = "Agendamento criado com sucesso!";
      })
      .addCase(createAgendamento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAgendamento.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateAgendamento.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.agendamentos = state.agendamentos.map((agendamento) =>
          agendamento._id === action.payload._id ? action.payload : agendamento
        );
        state.message = "Agendamento atualizado com sucesso!";
      })
      .addCase(updateAgendamento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAgendamento.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteAgendamento.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.agendamentos = state.agendamentos.filter(
          (agendamento) => agendamento._id !== action.payload._id
        );
        state.message = "Agendamento deletado com sucesso!";
      })
      .addCase(deleteAgendamento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(associatePacienteToAgendamento.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(associatePacienteToAgendamento.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.agendamentos = state.agendamentos.map((agendamento) =>
          agendamento._id === action.payload._id ? action.payload : agendamento
        );
        state.message = "Paciente associado ao agendamento com sucesso!";
      })
      .addCase(associatePacienteToAgendamento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = agendamentoSlice.actions;
export default agendamentoSlice.reducer;
