import SignupForm from './components/SignupForm';

export interface ISignupFormData {
  name: string;
  email: string;
  position: string;
  password: string;
  passwordCheck: string;
}

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignupForm />
    </div>
  );
}
