import LoginForm from "@/components/organisms/LoginForm"
import AuthLayout from "@/components/templates/AuthLayout"

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome Back">
      <LoginForm />
    </AuthLayout>
  )
}