import { auth } from "../config/firebase"
import type { User } from "./userApi"

// Function to get the current user's auth token
export const getAuthToken = async (): Promise<string | null> => {
  const user = auth.currentUser
  if (!user) return null

  try {
    const token = await user.getIdToken()
    return token
  } catch (error) {
    console.error("Error getting auth token:", error)
    return null
  }
}

// Function to fetch user data - matches /api/users/fetch-user-data/:id
export const fetchUserData = async (userId: string): Promise<User | null> => {
  try {
    const token = await getAuthToken()
    if (!token) throw new Error("No authentication token available")

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/your-project/us-central1/api"
    const response = await fetch(`${apiUrl}/api/users/fetch-user-data/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching user data:", error)
    return null
  }
}

// Function to create user - matches /api/users/create-user
export const createUserData = async (userData: Partial<User>): Promise<User | null> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/backend-repo-8d0e3/us-central1/api"
    const response = await fetch(`${apiUrl}/api/users/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

// Function to update user data - matches /api/users/update-user-data/:id
export const updateUserData = async (userId: string, userData: Partial<User>): Promise<User | null> => {
  try {
    const token = await getAuthToken()
    if (!token) throw new Error("No authentication token available")

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/your-project/us-central1/api"
    const response = await fetch(`${apiUrl}/api/users/update-user-data/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error updating user data:", error)
    return null
  }
}

// Function to generate token - matches /api/auth/generate-token
export const generateAuthToken = async (email: string, password: string): Promise<string | null> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/your-project/us-central1/api"
    const response = await fetch(`${apiUrl}/api/auth/generate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.token
  } catch (error) {
    console.error("Error generating token:", error)
    return null
  }
}

