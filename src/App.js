import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/homepage/homepage.component";
import { ShopPage } from "./pages/shop/shop.component";
import { Header } from "./components/header/header.component";
import { SignInSignUpPage } from "./pages/signIn-signUp/signIn-signUp.component";
import { useFirebaseLogin } from "./hooks/useFirebaseLogin";

function App() {
  const { currentUser } = useFirebaseLogin();

  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
