import React, { useState, useEffect } from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { removeRequest } from "../../utils/connection";
import Status from "../../utils/statusEnum";
import TwoFa from "../twofa/twoFa";
import Navbar from "../navbar";
import Footer from "../footer";
import FormRemove from "./formRemove";
import '../../style.css';

function Remove() {
  const [status, setStatus] = useState<Status>(Status.Start);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twofa, setTwofa] = useState("");
  const { showBoundary } = useErrorBoundary();

  async function handleSubmit(e) {
    e.preventDefault();
    setEmail(e.target.elements.email.value);
    setPassword(e.target.elements.password.value);
    setStatus(Status.FirstSubmit);
  }

  useEffect(() => {
    if (status === Status.TwoFaSubmitted) {
      const fetchData = async () => {
        fetch(removeRequest(email, password, twofa))
          .then(
            async (response) => {
              if (response.status === 200) {
                setStatus(Status.Success);
              } else {
                showBoundary(await response.json());
              }
            }
          )
          .catch((error) => {
            showBoundary(error);
          });
      };
      fetchData();
    }
  }, [status, email, password, twofa, showBoundary]);

  if (status === Status.FirstSubmit) {
    return (
      <TwoFa email={email} setTwofa={setTwofa} setStatus={setStatus} />
    );
  }

  if (status === Status.Success) {
    return (
      <>
        <h1>Successfully Removed Your Account!</h1>
        <a href="home">Go back to homepage</a>
      </>
    );
  }

  return (
    <>
      <FormRemove onSubmit={handleSubmit} />
    </>
  );
}

export default function RemovePage() {
  return (
    <>
      <Navbar />
      <div className="main_div">
        <div className="inner_div">
          <ErrorBoundary FallbackComponent={Fallback}>
            <Remove />
          </ErrorBoundary>
        </div>
      </div>
      <Footer />
    </>
  );
}

function Fallback({ error }) {
  const printable = (error.error != null) ? error.error : error.name;
  return (
    <>
      <h2>Something went Wrong! {printable}</h2>
      <a href="profile">return to Profile</a>
      <a href="home">return to Home</a>
    </>
  );
}

