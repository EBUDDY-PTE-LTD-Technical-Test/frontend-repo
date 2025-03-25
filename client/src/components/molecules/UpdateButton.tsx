"use client"

import { useState } from "react"
import { Button, CircularProgress, Typography, Box } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { updateUser } from "@/store/features/userSlice"

interface UpdateButtonProps {
  userId: string
  label?: string
}

export default function UpdateButton({ userId, label = "Update User Data" }: UpdateButtonProps) {
  const dispatch = useAppDispatch()
  const { updateStatus, updateError } = useAppSelector((state) => state.user)
  const [clicked, setClicked] = useState(false)

  const handleUpdate = async () => {
    setClicked(true)
    // Example data to update - in a real app, you might get this from a form
    const userData = {
      name: "Updated Name",
      // Add other fields as needed
    }

    await dispatch(updateUser({ userId, userData }))
  }

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        disabled={updateStatus === "loading"}
        startIcon={updateStatus === "loading" ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {label}
      </Button>

      {clicked && (
        <Box mt={2}>
          {updateStatus === "loading" && (
            <Typography variant="body2" color="text.secondary">
              Updating user data...
            </Typography>
          )}

          {updateStatus === "succeeded" && (
            <Typography variant="body2" color="success.main">
              User data updated successfully!
            </Typography>
          )}

          {updateStatus === "failed" && (
            <Typography variant="body2" color="error">
              Error: {updateError}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

