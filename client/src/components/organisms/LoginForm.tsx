"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Box, Card, CardContent, Typography, Alert, useMediaQuery, useTheme } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { login, clearError } from "@/store/features/authSlice"
import TextField from "@/components/atoms/TextField"
import Button from "@/components/atoms/Button"
import FormField from "@/components/molecules/FormField"

export default function LoginForm() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loading, error } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear field error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Clear global error when user types
    if (error) {
      dispatch(clearError())
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...formErrors }

    if (!formData.email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      valid = false
    }

    setFormErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await dispatch(login(formData)).unwrap()
      router.push("/dashboard")
    } catch (error) {
      // Error is handled in the auth slice
    }
  }

  return (
    <Card sx={{ maxWidth: 450, width: "100%", mx: "auto", mt: isMobile ? 2 : 8 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Log In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormField label="Email" error={formErrors.email}>
            <TextField
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={!!formErrors.email}
              disabled={loading}
              autoComplete="email"
            />
          </FormField>

          <FormField label="Password" error={formErrors.password}>
            <TextField
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={!!formErrors.password}
              disabled={loading}
              autoComplete="current-password"
            />
          </FormField>

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don&apos;t have an account?{" "}
            <Typography component="a" href="/register" color="primary">
              Register
            </Typography>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

