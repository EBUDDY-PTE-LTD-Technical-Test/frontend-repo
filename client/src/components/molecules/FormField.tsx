import type { ReactNode } from "react"
import { Box, FormHelperText, Typography } from "@mui/material"

interface FormFieldProps {
  label: string
  error?: string
  children: ReactNode
}

export default function FormField({ label, error, children }: FormFieldProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" component="label" sx={{ mb: 0.5, display: "block" }}>
        {label}
      </Typography>
      {children}
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  )
}

