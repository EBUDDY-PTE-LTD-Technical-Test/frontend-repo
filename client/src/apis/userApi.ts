import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define the base URL for API calls
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/backend-repo-8d0e3/us-central1/api"

// Define types for user data to match your backend interface
export interface User {
  uid: string
  name: string
  email: string
  password: string
}

// Create the API with endpoints that match your backend routes
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // Get the token from localStorage or other storage
      const token = localStorage.getItem("authToken")

      // If we have a token, add it to the headers
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    // Get user by ID - matches /api/users/fetch-user-data/:id
    getUserById: builder.query<User, string>({
      query: (id) => `users/fetch-user-data/${id}`,
    }),

    // Create user - matches /api/users/create-user
    createUser: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: `users/create-user`,
        method: "POST",
        body: userData,
      }),
    }),

    // Update user - matches /api/users/update-user-data/:id
    updateUser: builder.mutation<User, Partial<User> & { uid: string }>({
      query: ({ uid, ...patch }) => ({
        url: `users/update-user-data/${uid}`,
        method: "PUT",
        body: patch,
      }),
    }),

    // Generate token - matches /api/auth/generate-token
    generateToken: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: `auth/generate-token`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

// Export hooks for usage in components
export const { useGetUserByIdQuery, useCreateUserMutation, useUpdateUserMutation, useGenerateTokenMutation } = userApi

