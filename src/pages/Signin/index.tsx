import React, { useEffect, useState } from "react";
import formSchema, { InitialValues } from "./formSchema";
import { Form, Formik } from "formik";
import { ActionButton, InputText } from "../../components";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../services/config";

const Signin: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (values: InitialValues) => {
    setLoading(true);
    try {
      const response = await api.post(
        "/auth/login/",
        {
          // ...values,
          email: "cliente@youdrive.com",
          password: "password",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json;version=v1_web",
          },
        }
      );

      const { access, refresh } = response.data.tokens;

      await localStorage.setItem("accessToken", access);
      await localStorage.setItem("refreshToken", refresh);

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center h-dvh  bg-white-1">
      <div className="flex flex-col w-438px bg-white items-center rounded-[9px] p-[25px] w-[438px] drop-shadow-[0_0_64px_rgba(0,0,0,0.25)] ">
        <img src={logo} alt="logo" className="mb-[20px]" />
        <Formik
          {...formSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          <Form className="flex flex-1 flex-col w-full">
            <InputText
              name="email"
              type="email"
              label="E-mail"
              placeholder="@gmail.com"
            />
            <InputText
              name="password"
              type="password"
              label="Senha"
              placeholder="*******"
            />

            <ActionButton type="submit" text={"Sign In"} loading={loading} />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
