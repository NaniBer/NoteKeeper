// app/layout.tsx
"use client"; // This line makes this component a Client Component
import "./styles/global.css";

import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ApolloProvider>
  );
}
