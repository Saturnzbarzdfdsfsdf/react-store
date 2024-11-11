import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

import { shuffle } from '../../utils/common';
import { BASE_URL } from '../../utils/constants';

// описывает типа действия и идентификация в extraReducers
export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	// thunkApi: объект, предоставляющий методы для работы с состоянием и обработкой ошибок.
	async (_, thunkApi) => {
		try {
			// запрос и лимит 6 категорий
			const res = await axios.get(`${BASE_URL}/products`);
			// если запрос успешный, вернет data
			return res.data;
		} catch (err) {
			console.log(err);
			// вернет ошибку в redux, позволит ему обработать ошибку
			return thunkApi.rejectWithValue(err);
		}
	}
);

const productsSlice = createSlice({
	// имя для среза
	name: 'products',
	// начальное состояние
	initialState: {
		// изначально пустой массив будет хранить категории
		list: [],
		filtered: [],
		related: [],
		// состояние загрузки данных изначально false
		isLoading: false,
	},

	reducers: {
		// Фильтруем наши продукты не больше c ограничением по стоимости
		filteredByPrice: (state, action) => {
			state.filtered = state.list.filter(({ price }) => price < action.payload);
		},
		// Фильтрация продуктов относящихся к одной категории (пример в сингл продукт)
		getRelatedProducts: (state, action) => {
			const list = state.list.filter(
				({ category: { id } }) => id === action.payload
			);
			state.related = shuffle(list);
		},
	},

	// обработка асинхронных действий
	extraReducers: builder => {
		// builder: Это объект, который позволяет добавлять обработчики для разных состояний асинхронного действия.
		// ожидание
		builder.addCase(fetchProducts.pending, state => {
			state.isLoading = true;
		});
		// выполнено -> state текущее состояние, action объект действия
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.list = action.payload;
			state.isLoading = false;
		});
		// отклонено
		builder.addCase(fetchProducts.rejected, state => {
			state.isLoading = false;
		});
	},
});

export const { filteredByPrice, getRelatedProducts} = productsSlice.actions;

export default productsSlice.reducer;
