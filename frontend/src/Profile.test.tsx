import { render, screen, fireEvent, getByPlaceholderText } from '@testing-library/react'
import ProfilePage from './components/ProfilePage'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'


describe("Profile page testing", () => {
    test("profile page displays name", () => {
        render(
          <BrowserRouter>
            <ProfilePage />
          </BrowserRouter>
        )
        expect(screen.getByText("John Doe")).toBeInTheDocument()
      })
    test("profile page displays workouts", () => {
        render(
          <BrowserRouter>
            <ProfilePage />
          </BrowserRouter>
        )
        expect(screen.getByText("Workouts: 26")).toBeInTheDocument()
      })
    test("profile page displays streak", () => {
        render(
          <BrowserRouter>
            <ProfilePage />
          </BrowserRouter>
        )
        expect(screen.getByText("Streak: 5")).toBeInTheDocument()
      })
})
