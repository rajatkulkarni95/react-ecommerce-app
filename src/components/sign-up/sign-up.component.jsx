import React, { useState } from "react";
import { FormInput } from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";
import { useFirebaseLogin } from "../../hooks/useFirebaseLogin";

import "./sign-up.styles.scss";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

export const SignUp = () => {
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    const { displayName, email, password, confirmPassword } = state;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(`Cannot create user : ${error}`);
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
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign Up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          handleChange={handleChange}
          value={state.displayName}
          type="text"
          label="Display Name"
          required
        />
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
        <FormInput
          name="confirmPassword"
          handleChange={handleChange}
          value={state.confirmPassword}
          type="password"
          label="Confirm Password"
          required
        />

        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};
