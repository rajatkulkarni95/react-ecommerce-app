import React, { useState } from "react";
import { FormInput } from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";
import "./sign-in.styles.scss";
import { auth } from "../../firebase/firebase.utils";

import { signInWithGoogle } from "../../firebase/firebase.utils";

export const SignIn = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    const { email, password } = state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(`Cannot sign in with email and password: ${error}`);
    }
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          handleChange={handleChange}
          value={state.email}
          type="email"
          label="Email"
          required
        />
        <FormInput
          name="password"
          handleChange={handleChange}
          value={state.password}
          type="password"
          label="Password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
