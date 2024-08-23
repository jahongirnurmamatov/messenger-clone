import NextAuth from "next-auth";
import { authOptions } from "@/app/libs/auth";

const handler = NextAuth(authOptions);

// Export NextAuth handlers directly as GET and POST
export { handler as GET, handler as POST };
