export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agree: boolean;
}

export interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}