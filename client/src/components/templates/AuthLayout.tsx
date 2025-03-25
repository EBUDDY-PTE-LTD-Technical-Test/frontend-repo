import type { ReactNode } from "react"
import { Box, Container, Paper, Typography } from "@mui/material"

interface AuthLayoutProps {
  children: ReactNode
  title?: string
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ py: 4, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        {title && (
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            {title}
          </Typography>
        )}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  )
}

