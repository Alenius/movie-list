import React from "react";
import { Layout } from "../components/Layout";

export const LoginPage = () => {
  return (
    <Layout>
      <div data-netlify-identity-button>Login with Netlify Identity</div>
    </Layout>
  );
};
