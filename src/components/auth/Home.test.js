import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

import Home from "./Home";

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

it("should render title text, login and signup button correctly", () => {
  act(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      container
    );
  });

  const title = document.querySelector("[data-testid=title]");
  expect(title.textContent).toBe("Ride.Collect.Repeat.");

  const loginButton = document.querySelector("[data-testid=login]");
  expect(loginButton.textContent).toBe("Login");

  const signupButton = document.querySelector("[data-testid=signup]");
  expect(signupButton.textContent).toBe("Signup");
});
