import Auth from "~/components/auth/Auth";
import { useRouter } from "next/router";

import Layout from "~/components/Layout";

const AuthPage = () => {
  const { query } = useRouter();
  const slug = query.slug as string;
  if (typeof slug !== "string") return null;

  
  return (
    <Layout>
      <section className="py-20">
        <div className="element-center container flex-col">
          <Auth slug={slug} />
        </div>
      </section>
    </Layout>
  );
};

export default AuthPage;

