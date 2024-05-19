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
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (values: InitialValues) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.post(
        "/auth/login/",
        {
          ...values,
          // email: "cliente@youdrive.com",
          // password: "password",
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

      navigate("/");
    } catch (error) {
      setError("E-mail ou senha inválido");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center h-dvh  bg-white-1">
      <div className="flex flex-col w-438px bg-white items-center rounded-[9px] p-[25px] w-[438px] drop-shadow-[0_0_64px_rgba(0,0,0,0.25)] ">
        <img
          src={logo}
          alt="logo"
          className="mb-[20px]"
          data-testid="logo-cypress"
        />
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
              data-testid="email-form-cypress"
            />
            <InputText
              name="password"
              type="password"
              label="Senha"
              placeholder="*******"
              data-testid="password-form-cypress"
            />
            {error ? (
              <div className="text-red text-[12px]">{error}</div>
            ) : (
              <div className="h-[18px]" />
            )}

            <ActionButton type="submit" text={"Sign In"} loading={loading} />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
