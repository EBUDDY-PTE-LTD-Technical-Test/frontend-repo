"use client"

import { useEffect } from "react"
import { Typography, Box, Card, CardContent, Grid } from "@mui/material"
import DashboardLayout from "@/components/templates/DashboardLayout"
import UpdateButton from "@/components/molecules/UpdateButton"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchUser } from "@/store/features/userSlice"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)
  const { userData, loading, error } = useAppSelector((state) => state.user)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push("/login")
      return
    }

    // Fetch user data
    dispatch(fetchUser(user.uid))
  }, [dispatch, user, router])

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <DashboardLayout title="Dashboard">
      <Typography variant="h4" gutterBottom>
        Welcome to your Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>

              {loading ? (
                <Typography>Loading user data...</Typography>
              ) : error ? (
                <Typography color="error">Error: {error}</Typography>
              ) : userData ? (
                <Box>
                  <Typography variant="body1">
                    <strong>Name:</strong> {userData.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {userData.email}
                  </Typography>
                  {/* Display other user data as needed */}

                  <Box sx={{ mt: 2 }}>
                    <UpdateButton userId={user.uid} />
                  </Box>
                </Box>
              ) : (
                <Typography>No user data available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Typography variant="body2" paragraph>
                This is where you can add quick action buttons or widgets.
              </Typography>
              {/* Add more UI elements as needed */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}

