import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pages, Routes } from "~/constants/enums";
import axios from "~/lib/axios";
import { User } from "~/types/app";
import { loginSchema } from "~/validation/auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    error?: "RefreshAccessTokenError"
    user: DefaultSession["user"] & {
      id: string;
      access_token:string
      refresh_token:string
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   access_token:string
    
  // }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
      error?: "RefreshAccessTokenError"
      access_token:string
      expires_in:number
      refresh_token:string
      
  }
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
async function refreshAccessToken(token:JWT) {
  try {
   

    const res = await axios({
      method:"post",
      url:"/oauth/token",
      headers: { "Content-Type": "multipart/form-data" },
      data:{client_id:"3_APPID",client_secret:"TOPSECRET",grant_type:"refresh_token",refresh_token:token.refresh_token}
    })
    const refreshedTokens = res.data

    if (!refreshedTokens) {
      throw refreshedTokens
    }
    const now = new Date()
    const accessTokenExpires = now.setSeconds(
      now.getSeconds() + parseInt(refreshedTokens.expires_in) - 10,
    )

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      expires_in: accessTokenExpires,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token, // Fall back to old refresh token
    }
  } catch (error) {
    console.error("Error refreshing access token", error)


    return { ...token, error: "RefreshAccessTokenError" as const }

  }
}
export const authOptions: NextAuthOptions = {
 
  callbacks: {
    async jwt({ token, user ,account}):Promise<JWT> {
      let res: JWT
      const now = Date.now()
      if (account && user) {
      
       res =  {
        access_token: account.access_token as string,
        expires_in: account.expires_at as number ,
        refresh_token: account.refresh_token  as string,
        user,
       }
     
      }else if (token.expires_at === null || now < token.expires_in) {
        // Subsequent use of JWT, the user has been logged in before
        // access token has not expired yet
        res = token
      } else {
        // access token has expired, try to update it
        res =  await refreshAccessToken(token)
      }
     return res
    // return {...token,...user}
    },
    async session({ session, token, user }) {
      session.user = token as any;
      session.error = token.error
      return session;
    },
  },
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        try {
          const { username, password } = await loginSchema.parseAsync(credentials);
          const res = await axios({
            method:"post",
            url:"/oauth/token",
            data:{username,password , grant_type:"password",client_secret:"TOPSECRET",client_id:"3_APPID"},
            headers: { "Content-Type": "multipart/form-data" },
          })
          const user = res.data
          if (user) {
            return user;
          } else {
            return null;
          }
        }catch(error : any){
          console.log(error.response.data)
          throw new Error(JSON.stringify(error.response.data));
        }
       
      },
    }),
  ],
  pages:{
    signIn:`/${Routes.AUTH}/${Pages.LOGIN}`,
   signOut:`${Routes.ROOT}`
    
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
