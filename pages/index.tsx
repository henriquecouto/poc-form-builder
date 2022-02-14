import type { NextPage } from "next";
import Head from "next/head";
import { useFormBuilder as useReactHookFormBuilder } from "../src/components/react-hook-form";
import { FormSchema } from "../src/types/form-schema";

const formSchema: FormSchema = [
  {
    name: "numeroCartao",
    type: "text",
    placeholder: "Número do Cartão",
    mask: "0000 0000 0000 0000[00]",
    rules: {
      validate: (value: string) => {
        if (value !== "4111 1111 1111 1111") return false;

        return true;
      },
    },
  },
  {
    name: "titular",
    type: "text",
    placeholder: "Nome do titular do cartão",
    mask: /[A-Za-z]/,
    rules: {
      validate: (value) => {
        if (value.split(" ").length < 2) return false;
        return true;
      },
    },
  },
  {
    name: "validadeMes",
    type: "select",
    placeholder: "Mês",
    rules: { required: true },
    options: Array.from(Array(12).keys(), (v) => ({
      label: `${v + 1}`,
      value: v + 1,
    })),
  },
  {
    name: "validadeAno",
    type: "select",
    placeholder: "Ano",
    rules: { required: true },
    options: Array.from(Array(11).keys(), (v) => {
      const startYear = new Date().getFullYear();
      return {
        label: `${v + startYear}`,
        value: v + startYear,
      };
    }),
  },
  {
    name: "cvv",
    type: "text",
    placeholder: "CVV",
    rules: { required: true },
    mask: "000",
  },
];

const Home: NextPage = () => {
  const { Form, formState } = useReactHookFormBuilder({
    formSchema,
    formId: "teste",
    onSubmit: (data) => alert(JSON.stringify(data)),
  });
  return (
    <div>
      <Head>
        <title>Form Builder POC</title>
        <meta name="description" content="A POC to create a form builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          React Hook Form - submitted: {formState.isSubmitSuccessful.toString()}
        </h1>
        {Form}
        <button type="submit" form="teste">
          submit
        </button>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
