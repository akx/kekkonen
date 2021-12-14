import React from "react";
import kekkonen from "../..";

interface AppState {
  loginState: null | { username: string };
  navBarColor: string;
}

type AppAction = ["login"] | ["logout"] | ["changeNavColor", string];

function appStateReducer(state: AppState, action: AppAction) {
  switch (action[0]) {
    case "login":
      return { ...state, loginState: { username: "Urho" } };
    case "logout":
      return { ...state, loginState: null };
    case "changeNavColor":
      return { ...state, navBarColor: action[1] };
  }
}
const app = kekkonen(appStateReducer, () => ({
  loginState: null,
  navBarColor: "#faca03",
}));

function NavBar() {
  const { loginState, navBarColor } = app.useState();
  const dispatch = app.useDispatch();
  return (
    <nav style={{ backgroundColor: navBarColor, padding: "1em" }}>
      {loginState ? (
        <button onClick={() => dispatch(["logout"])}>
          Logout {loginState.username}
        </button>
      ) : (
        <button onClick={() => dispatch(["login"])}>Login</button>
      )}
    </nav>
  );
}

function Main() {
  const { loginState } = app.useState();
  if (!loginState) return null;
  return <h1>hello!!! you are {loginState.username}</h1>;
}

function NavbarColorizer() {
  const { navBarColor } = app.useState();
  const dispatch = app.useDispatch();
  return (
    <label>
      Select navbar color:{" "}
      <input
        type="color"
        value={navBarColor}
        onChange={(e) => dispatch(["changeNavColor", e.target.value])}
      />
    </label>
  );
}

const AppProvider = app.Provider;
export default function App() {
  return (
    <AppProvider>
      <NavBar />
      <main>
        <Main />
        <hr />
        <NavbarColorizer />
      </main>
    </AppProvider>
  );
}
