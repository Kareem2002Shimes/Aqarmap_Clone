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

  interface User {
    access_token:string
    refresh_token:string
    expires_in:number
    
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
      error?: any
      access_token:string
      accessTokenExpires:number
      refresh_token:string
      
  }
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID || ""
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || ""


async function refreshAccessToken(token:JWT) {
  try {
    const formData = new URLSearchParams()

    formData.append("grant_type", "refresh_token")
    formData.append("client_id", OAUTH_CLIENT_ID)
    formData.append("client_secret",OAUTH_CLIENT_SECRET )
    formData.append("refresh_token", token.refresh_token)

    const response = await axios(
     {
      method:"post",
      data:formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
     }
    )

    const data =  response.data

    if (!data) {
      throw data
    }

    return {
      ...token,
      access_token: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
      refresh_token: data.refresh_token ?? token.refresh_token,
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions: NextAuthOptions = {
 
  callbacks: {
    async jwt({ token, user ,account}):Promise<JWT> {
   
      if (user) {
        token.access_token = user.access_token
        token.accessTokenExpires = Date.now() + user.expires_in * 1000
        token.refreshToken = user.refresh_token
      }

      // If token has not expired, return it,
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Otherwise, refresh the token.
      return refreshAccessToken(token)
   
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
