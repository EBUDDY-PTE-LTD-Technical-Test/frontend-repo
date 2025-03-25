"use client"

import { useState, useEffect } from "react"
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  TextField
} from "@mui/material"
import DashboardLayout from "@/components/templates/DashboardLayout"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useRouter } from "next/navigation"
import { User } from "@/apis/userApi" // Adjust import path as needed

export default function SettingsPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)

  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push("/login")
      return
    }
  }, [user, router])

  const handlePasswordChange = async () => {
    // Basic validation
    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      alert("New passwords do not match")
      return
    }

    if (user) {
      try {
        // Implement password change logic
        // This would typically dispatch an action to change the password
        // dispatch(changePassword({
        //   uid: user.uid,
        //   currentPassword: passwordChange.currentPassword,
        //   newPassword: passwordChange.newPassword
        // }))

        // Reset password fields
        setPasswordChange({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
      } catch (error) {
        console.error("Password change failed", error)
      }
    }
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout title="Settings">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Current Password"
                    value={passwordChange.currentPassword}
                    onChange={(e) => setPasswordChange(prev => ({
                      ...prev, 
                      currentPassword: e.target.value
                    }))}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    value={passwordChange.newPassword}
                    onChange={(e) => setPasswordChange(prev => ({
                      ...prev, 
                      newPassword: e.target.value
                    }))}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                    value={passwordChange.confirmPassword}
                    onChange={(e) => setPasswordChange(prev => ({
                      ...prev, 
                      confirmPassword: e.target.value
                    }))}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handlePasswordChange}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}