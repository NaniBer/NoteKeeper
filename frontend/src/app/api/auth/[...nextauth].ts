// import NextAuth, {
//   DefaultUser,
//   DefaultSession,
//   SessionStrategy,
// } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// interface CustomUser extends DefaultUser {
//   _id: number; // Extend DefaultUser with additional properties
// }

// interface CustomToken {
//   _id?: number; // Optional property
// }

// interface CustomSession extends DefaultSession {
//   id?: number; // Optional property
// }

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials): Promise<CustomUser | null> {
//         // Example: Fetch user from your database
//         const user = { _id: 1, name: "User", email: "user@example.com" }; // Mock user

//         if (user) {
//           return user as CustomUser; // Cast to CustomUser type
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt" as SessionStrategy, // Use SessionStrategy type here
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: CustomToken; user?: CustomUser }) {
//       if (user) {
//         token._id = user._id; // Add user id to token
//       }
//       return token;
//     },
//     async session({
//       session,
//       token,
//     }: {
//       session: CustomSession;
//       token: CustomToken;
//     }) {
//       session.id = token._id; // Add user id to session
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
