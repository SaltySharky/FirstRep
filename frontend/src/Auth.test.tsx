import { render, screen, fireEvent, getByPlaceholderText } from '@testing-library/react'
import App from './App'
import SignUp from './components/auth/SignUp'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Login from './components/auth/Login'
import HomePage from './components/HomePage'


describe("Sign Up page", () => {
  test("Sign up page renders with email paramater", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
  })

  test("Sign Up page renders with password and confirm password parameters", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument()
  })


  test("Sign Up page creates new user", () => {
  
    render (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText("Email")
    const passwordInput = screen.getByPlaceholderText("Password")
    const passwordConfirmInput = screen.getByPlaceholderText("Confirm Password")
    const signUpButton = screen.getAllByText("Continue")

    fireEvent.change(emailInput, {target: {value: "jennifer@yahoo.com"}})
    fireEvent.change(passwordInput, {target: {value: "jen1234567"}})
    fireEvent.change(passwordConfirmInput, {target: {value: "jen1234567"}})
    fireEvent.click(signUpButton[0])
  })
})

describe("Login page", () => {
  test("Sign in page renders with email paramater", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
  })

  test("Login page renders with password paramter", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
  })

  test("Login page renders with Google auth option", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    expect(screen.getByText("Continue with Google")).toBeInTheDocument()
  })

  test("Login existing user", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText("Email")
    const passwordInput = screen.getByPlaceholderText("Password")
    const loginButton = screen.getAllByText("Login")

    fireEvent.change(emailInput, {target: {value: "ferris@gmail.com"}})
    fireEvent.change(passwordInput, {target: {value: "fer1234567"}})
    fireEvent.click(loginButton[1])
  })
})
