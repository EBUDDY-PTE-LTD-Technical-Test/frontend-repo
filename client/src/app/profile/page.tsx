"use client"

import { useState, useEffect } from "react"
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  Button 
} from "@mui/material"
import DashboardLayout from "@/components/templates/DashboardLayout"
import { useAppSelector } from "@/store/hooks"
import { useRouter } from "next/navigation"
import { User } from "@/apis/userApi"
import { useUpdateUserMutation } from "@/apis/userApi"
import { toast } from "react-toastify"

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const [userData, setUserData] = useState<Partial<User>>({
    name: "",
    email: "",
  })

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push("/login")
      return
    }

    // Populate form with existing user data
    if (user) {
      setUserData({
        name: user.displayName || "", 
        email: user.email || ""
      })
    }
  }, [user, router])

  const handleProfileUpdate = async () => {
    if (user) {
      try {
        // Use the RTK Query mutation to update user data
        const result = await updateUser({
          uid: user.uid,
          name: userData.name
        }).unwrap()

        // Show success toast
        toast.success("Profile updated successfully!")
      } catch (error) {
        // Show error toast
        toast.error("Failed to update profile")
        console.error("Profile update failed", error)
      }
    }
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout title="Profile">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={userData.name}
                    onChange={(e) => setUserData(prev => ({
                      ...prev, 
                      name: e.target.value
                    }))}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={userData.email}
                    disabled
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleProfileUpdate}
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Profile"}
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