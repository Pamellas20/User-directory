import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import UserProfilePage from "./pages/UserProfilePage"
import AddUserPage from "./pages/AddUserPage"
import { UserProvider } from "./context/UserContext"

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users/:id" element={<UserProfilePage />} />
              <Route path="/add-user" element={<AddUserPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  )
}
