import { IRegister, ILogin } from 'types/index.d';

export const validationRegister = (user: IRegister) => {
  const { name, email, password, confirmPassword } = user;

  const errors: string[] = [];

  if (!name.trim()) {
    errors.push('Please add a name');
  } else if (name.length > 20) {
    errors.push('your name is up to 20 characters long');
  }

  if (!email.trim()) {
    errors.push('Please add an email');
  } else if (!validateEmail(email)) {
    errors.push('Enter an valid email');
  }

  const msg = checkPassword(password, confirmPassword);

  if (msg) errors.push(msg);

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

export const validationLogin = (user: ILogin) => {
  const { email } = user;

  const errors: string[] = [];

  if (!email.trim()) {
    errors.push('Please add an email');
  } else if (!validateEmail(email)) {
    errors.push('Enter an valid email');
  }

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const checkPassword = (password: string, confirmPassword: string) => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  } else if (password !== confirmPassword) {
    return 'Confirm password did not matched';
  }
};
