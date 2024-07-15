import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pacienteService from "../services/pacienteService";

const initialState = {
  pacientes: [],
  paciente: null,
  error: false,
  success: false,
  loading: false,
  message: null,
};

// thunks
export const fetchPacientes = createAsyncThunk(
  "paciente/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await pacienteService.getPacientes();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPaciente = createAsyncThunk(
  "paciente/fetchById",
  async (id, thunkAPI) => {
    try {
      const data = await pacienteService.getPaciente(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createPaciente = createAsyncThunk(
  "paciente/create",
  async (pacienteData, thunkAPI) => {
    try {
      const data = await pacienteService.createPaciente(pacienteData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePaciente = createAsyncThunk(
  "paciente/update",
  async ({ id, pacienteData }, thunkAPI) => {
    try {
      const data = await pacienteService.updatePaciente(id, pacienteData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePaciente = createAsyncThunk(
  "paciente/delete",
  async (id, thunkAPI) => {
    try {
      const data = await pacienteService.deletePaciente(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchPaciente = createAsyncThunk(
  "paciente/search",
  async (query, thunkAPI) => {
    try {
      const data = await pacienteService.searchPaciente(query);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addExame = createAsyncThunk(
  "paciente/addExame",
  async ({ id, exameData }, thunkAPI) => {
    try {
      const data = await pacienteService.addExame(id, exameData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteExame = createAsyncThunk(
  "paciente/deleteExame",
  async ({ pacienteId, exameId }, thunkAPI) => {
    try {
      const data = await pacienteService.deleteExame(pacienteId, exameId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const downloadAnexo = createAsyncThunk(
  "paciente/downloadAnexo",
  async ({ pacienteId, exameId }, thunkAPI) => {
    try {
      const data = await pacienteService.downloadAnexo(pacienteId, exameId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const viewAnexo = createAsyncThunk(
  "paciente/viewAnexo",
  async ({ pacienteId, exameId }, thunkAPI) => {
    try {
      const data = await pacienteService.viewAnexo(pacienteId, exameId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const pacienteSlice = createSlice({
  name: "paciente",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPacientes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPacientes.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pacientes = action.payload;
      })
      .addCase(fetchPacientes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPaciente.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPaciente.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.paciente = action.payload;
      })
      .addCase(fetchPaciente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPaciente.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createPaciente.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pacientes.push(action.payload);
        state.message = "Paciente criado com sucesso!";
      })
      .addCase(createPaciente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePaciente.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePaciente.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pacientes = state.pacientes.map((paciente) =>
          paciente._id === action.payload._id ? action.payload : paciente
        );
        state.message = "Paciente atualizado com sucesso!";
      })
      .addCase(updatePaciente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePaciente.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePaciente.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pacientes = state.pacientes.filter(
          (paciente) => paciente._id !== action.payload._id
        );
        state.message = "Paciente deletado com sucesso!";
      })
      .addCase(deletePaciente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchPaciente.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchPaciente.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pacientes = action.payload;
      })
      .addCase(searchPaciente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addExame.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addExame.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.paciente = action.payload;
        state.message = "Exame adicionado com sucesso!";
      })
      .addCase(addExame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteExame.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteExame.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.paciente = action.payload;
        state.message = "Exame deletado com sucesso!";
      })
      .addCase(deleteExame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(downloadAnexo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(downloadAnexo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(downloadAnexo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(viewAnexo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(viewAnexo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(viewAnexo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = pacienteSlice.actions;
export default pacienteSlice.reducer;
