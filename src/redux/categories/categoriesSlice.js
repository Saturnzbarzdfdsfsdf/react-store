import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

import { BASE_URL } from '../../utils/constants';

// описывает типа действия и идентификация в extraReducers
export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	// thunkApi: объект, предоставляющий методы для работы с состоянием и обработкой ошибок.
	async (_, thunkApi) => {
		try {

      // запрос и лимит 6 категорий 
			const res = await axios(`${BASE_URL}/categories?limit=6`);
      // если запрос успешный, вернет data
			return res.data;

		} catch (err) {
			console.log(err);
      // вернет ошибку в redux, позволит ему обработать ошибку
			return thunkApi.rejectWithValue(err);
		}
	}
);

const categoriesSlice = createSlice({
  // имя для среза
	name: 'categories',
  // начальное состояние
	initialState: {
    // изначально пустой массив будет хранить категории
		list: [],
    // состояние загрузки данных изначально false
		isLoading: false,
	},

  // обработка асинхронных действий
	extraReducers: builder => {
		// builder: Это объект, который позволяет добавлять обработчики для разных состояний асинхронного действия.
    // ожидание
		builder.addCase(fetchCategories.pending, state => {
			state.isLoading = true;
		});
		// выполнено -> state текущее состояние, action объект действия
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.list = action.payload;
			state.isLoading = false;
		});
		// отклонено
		builder.addCase(fetchCategories.rejected, state => {
			state.isLoading = false;
		});
	},
});

export default categoriesSlice.reducer;
