import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import HomePage from "./HomePage";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    currentUser: null,
  }),
}));

it("should render correct login and signup button", () => {
  act(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
      container
    );
  });

  const loginButton = document.querySelector("[data-testid=login]");
  expect(loginButton.innerHTML).toBe("Login");
  
  const signupButton = document.querySelector("[data-testid=signup]");
  expect(signupButton.innerHTML).toBe("Signup");
});
