// создали api с createApi и fetchBaseQuery
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// createApi: Функция из Redux Toolkit, которая упрощает создание API-срезов (slices) для работы с RESTful API.
// fetchBaseQuery: Упрощенная функция для выполнения HTTP-запросов. Она автоматически обрабатывает запросы и ответы, а также ошибки.

import { BASE_URL } from '../../utils/constants';

// создали новый api slice
export const apiSlice = createApi({
	// Указывает путь в Redux store, под которым будет храниться состояние этого API
	reducerPath: 'api',
	// Базовый запрос для всех эндпоинтов. Используется fetchBaseQuery
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	// Определяет типы тегов, которые могут быть использованы для управления кешированием данных.
	tagTypes: ['Product'],
	// Эндпоинты для вашего API. В данном случае создается один эндпоинт getProduct.
	endpoints: builder => ({
		// Запрос, для получения продукта по id
		// Функция, которая принимает аргументы (в данном случае объект с id)
		getProduct: builder.query({
			query: ({ id }) => `/products/${id}`,
			// Указывает, что этот запрос предоставляет данные с тегом 'Product'
			providesTags: ['Product'],
		}),
	}),
});

export const { useGetProductQuery } = apiSlice;

// Подход через apiSlice нужно будет добавить в store middleware