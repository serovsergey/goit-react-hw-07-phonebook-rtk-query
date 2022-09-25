import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Contacts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://632dcf28519d17fb53c6f0c5.mockapi.io/contacts' }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => '',
      providesTags: (result, error, arg) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Contacts', id })),
            { type: 'Contacts', id: 'LIST' }
          ]
          : [{ type: 'Contacts', id: 'LIST' }],
    }),
    addContact: builder.mutation({
      query: (item) => ({
        url: '',
        body: item,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
  }),
})

export const { useGetContactsQuery, useAddContactMutation, useDeleteContactMutation } = contactsApi;
