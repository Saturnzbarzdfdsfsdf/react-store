// Это функция из Redux Toolkit, которая упрощает создание и настройку Redux store. Она автоматически настраивает необходимые миддлвары и включает поддержку инструмента разработчика (Redux DevTools).
import { configureStore } from '@reduxjs/toolkit';

// Импорт срезов (slices)
import categoriesSlice from './categories/categoriesSlice';
import productsSlice from './products/productsSlice';
import userSlice from './user/userSlice';
// slice для управления API-запросами с использованием createApi.
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
	// Определяем корневые редюсеры для вашего состояния.
	reducer: {
		categories: categoriesSlice,
		products: productsSlice,
		user: userSlice,
		// Это позволяет динамически устанавливать путь редюсера, который был определен в createApi.
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	// Добавляется миддлвар из apiSlice, который отвечает за обработку асинхронных запросов и кеширование данных.
	middleware: getMiddleware => getMiddleware().concat(apiSlice.middleware),
});