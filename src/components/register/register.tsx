import React, { useState, useEffect } from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { registerRequest } from "../../utils/connection";
import Status from "../../utils/statusEnum";
import TwoFa from "../twofa/twoFa";
import Navbar from "../navbar";
import Footer from "../footer";
import { setToken } from "../../utils/cookie";
import FormRegister from "./formRegister";

function Register() {
  const [status, setStatus] = useState<Status>(Status.Start);
  const [samePass, setSamePass] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twofa, setTwofa] = useState("");
  const { showBoundary } = useErrorBoundary();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.password.value !== form.repeat_password.value) {
      setSamePass(false);
      return;
    }
    setSamePass(true);
    setEmail(form.email.value);
    setPassword(form.password.value);
    setStatus(Status.FirstSubmit);
  }

  useEffect(() => {
    if (status === Status.TwoFaSubmitted) {
      const fetchData = async () => {
        fetch(registerRequest(email, password, twofa))
          .then(async (response) => {
            if (response.status === 200) {
              const body = await response.json();
              setToken(body.token);
              setStatus(Status.Success);
            } else {
              showBoundary(await response.json());
            }
          })
          .catch((error: Error) => {
            showBoundary(error);
          });
      };
      fetchData();
    }
  }, [status, email, password, twofa, showBoundary]);

  if (status === Status.FirstSubmit) {
    return <TwoFa email={email} setTwofa={setTwofa} setStatus={setStatus} />;
  }

  if (status === Status.Success) {
    return (
      <>
        <h1>Registrazione avvenuta con successo</h1>
        <a href="home">Torna alla homepage</a>
      </>
    );
  }


  return (
    <>
      <FormRegister onSubmit={handleSubmit} samePass={samePass} />
    </>
  );
}

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <div className="main_div">
        <div className="inner_div">
          <ErrorBoundary FallbackComponent={Fallback}>
            <Register />
          </ErrorBoundary>
        </div>
      </div>
      <Footer />
    </>
  );
}

function Fallback({ error }: { error: Error }) {
  const printable = error.error != null ? error.error : error.name;
  return (
    <>
      <h2>C'è stato un problema! {printable}</h2>
      <a href="register">Torna alla registrazione</a>
      <a href="home">Torna alla Home</a>
    </>
  );
}

