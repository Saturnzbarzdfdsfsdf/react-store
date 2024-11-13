import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

import { BASE_URL } from '../../utils/constants';

// описывает типа действия и идентификация в extraReducers
export const createUser = createAsyncThunk(
	'users/getUsers',
	async (payload, thunkApi) => {
		try {
			// c запросом отправляем информацию о user
			const res = await axios.post(`${BASE_URL}/users`, payload);
			// если запрос успешный, вернет data
			console.log('response create', res);
			return res.data;
		} catch (err) {
			const errorMessage =
				err.response?.data?.message || err.message || 'Неизвестная ошибка';
			console.log(errorMessage);

			// вернет ошибку в redux, позволит ему обработать ошибку
			return thunkApi.rejectWithValue(errorMessage);
		}
	}
);
export const loginUser = createAsyncThunk(
	'users/loginUser',
	async (payload, thunkApi) => {
		try {
			// c запросом отправляем информацию о user
			const res = await axios.post(`${BASE_URL}/auth/login`, payload);
			const login = await axios.get(`${BASE_URL}/auth/profile`, {
				headers: {
					Authorization: `Bearer ${res.data.access_token}`,
				},
			});
			// если запрос успешный, вернет login
			return login.data;
		} catch (err) {
			const errorMessage =
				err.response?.data?.message || err.message || 'Неизвестная ошибка';
			console.log(errorMessage);
			// вернет ошибку в redux, позволит ему обработать ошибку
			return thunkApi.rejectWithValue(errorMessage);
		}
	}
);
export const updateUser = createAsyncThunk(
	'users/updateUser',
	async (payload, thunkApi) => {
		try {
			// c запросом отправляем информацию о user
			const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
			const login = await axios.get(`${BASE_URL}/auth/profile`, {
				headers: {
					Authorization: `Bearer ${res.data.access_token}`,
				},
			});
			// если запрос успешный, вернет login
			return login.data;
		} catch (err) {
			const errorMessage =
				err.response?.data?.message || err.message || 'Неизвестная ошибка';
			console.log(errorMessage);
			// вернет ошибку в redux, позволит ему обработать ошибку
			return thunkApi.rejectWithValue(errorMessage);
		}
	}
);

// Убрал дубликаты
const addCurrentUser = (state, { payload }) => {
	state.currentUser = payload;
};

const userSlice = createSlice({
	// имя для среза
	name: 'user',
	// начальное состояние
	initialState: {
		currentUser: null,
		cart: [],
		isLoading: false,
		// для users
		showForm: false,
		formType: 'signup',
	},

	reducers: {
		addItemToCart: (state, { payload }) => {
			// создали новый массив скопировав текущий массив cart
			let newCart = [...state.cart];
			// проверяем есть ли уже товар с таким же id
			const existingItem = state.cart.find(item => item.id === payload.id);

			// обработка найденного товара
			if (existingItem) {
				// обновляем количество товара
				newCart = newCart.map(item => {
					return item.id === payload.id // если id совпадает, обновляем количество
						? { ...item, quantity: item.quantity + 1 }
						: item; // если id НЕ совпал, то возвращаем без изменений
				});
			} else newCart.push({ ...payload, quantity: 1 }); // если товара нет, добавим его
			// обновим состояние корзины
			state.cart = newCart;
		},
		removeItemFromCart: (state, { payload }) => {
			state.cart = state.cart.filter(({ id }) => id !== payload);
		},
		toggleForm: (state, action) => {
			state.showForm = action.payload;
		},
		toggleFormType: (state, action) => {
			state.formType = action.payload;
		},
	},
	// обработка асинхронный действий
	extraReducers: builder => {
		builder.addCase(createUser.fulfilled, addCurrentUser);
		builder.addCase(loginUser.fulfilled, addCurrentUser);
		builder.addCase(updateUser.fulfilled, addCurrentUser);
	},
});



export const { addItemToCart, toggleForm, toggleFormType, removeItemFromCart } =
	userSlice.actions;

export default userSlice.reducer;
