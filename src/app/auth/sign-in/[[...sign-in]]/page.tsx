import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return <SignIn signInUrl='/auth/sing-in'/>
}