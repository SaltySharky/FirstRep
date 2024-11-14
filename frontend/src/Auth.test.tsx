import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import SignUp from './components/auth/SignUp'
import { BrowserRouter } from 'react-router-dom'
import Login from './components/auth/Login'
import HomePage from './components/HomePage'

/*
test("default route", async () => {
  render(
    <App />, {wrapper: BrowserRouter}
  )

    expect(screen.getByText("Sign In")).toBeInTheDocument()
})
*/
describe("Sign Up page", () => {
  test("Sign up page renders with email paramater", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  test("Sign Up page renders with password and confirm password parameters", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    expect(screen.getByText("Password")).toBeInTheDocument()
    expect(screen.getByText("Confirm Password")).toBeInTheDocument()
  })

/*  
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
    const signUpButton = screen.getByText("Sign Up")

    fireEvent.change(emailInput, {target: {value: "jennifer@yahoo.com"}})
    fireEvent.change(passwordInput, {target: {value: "jen1234567"}})
    fireEvent.change(passwordConfirmInput, {target: {value: "jen1234567"}})
    fireEvent.click(signUpButton)

    expect(screen.getByText("Hello")).toBeInTheDocument()
  })
  */
})
