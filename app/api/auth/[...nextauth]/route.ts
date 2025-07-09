import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        // Find user by email (username field is used as email)
        const user = await db.collection("users").findOne({ email: credentials?.username });
        if (user && user.password && credentials?.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            // Remove password before returning user object
            const { password, ...userWithoutPassword } = user;
            return { ...userWithoutPassword, id: user._id.toString() };
          }
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  }
});

export { handler as GET, handler as POST }; 