// src/app/ClientRootLayout.tsx
"use client"; // Ensure this is at the top

import { Provider } from "react-redux";
import { store } from "../store/store"; // Adjust the path if necessary

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
