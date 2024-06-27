import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "..";

export const appointments = createApi({
  reducerPath: "admin-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}`,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: ({ page }) => `appointments/?page=${page}&limit=20`, // expects a JSON response
    }),
    getAppointment: builder.query({
      query: ({ apId: id }) => `appointments/${id}`, // expects a JSON response
    }),
  }),
});

// export const { useLazyGetAppointmentQuery, useLazyGetAppointsmentsQuery } =
//   appointments;
