import NextAuth from "next-auth";
import { authOptions } from "../../../../../lib/authoptions";
const handler=NextAuth(authOptions)
export {handler as POST , handler as GET}