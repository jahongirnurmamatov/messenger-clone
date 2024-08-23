
import authOptions from "@/app/libs/auth";
import NextAuth from "next-auth";


const handler = NextAuth(authOptions);

// Export NextAuth handlers directly as GET and POST
export { handler as GET, handler as POST };
