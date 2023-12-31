import {  GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { JWT, getToken } from "next-auth/jwt";
import Head from "next/head";
import Layout from "~/components/Layout";
import Landing from "~/components/home/Landing";
import Search from "~/components/home/Search";
import axios from "~/lib/axios";
import { authOptions } from "~/server/auth";

const Home:React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({userSession}) => {

  return (
    <>
      <Head>
        <title>Aqarmap • Buy, sell, and rent Real Estate in Egypt</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://aqarmap.com.eg/favicon.ico?revision-eg-19533b1"
        />
      </Head>
      <Layout userSession={userSession}>
        <Landing />
        <Search />
      </Layout>
    </>
  );
};


export default Home;
export async function getServerSideProps(context:GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)
 
  return {
    props: {
      userSession : JSON.stringify(session?.user) || null,
    },
  }
}