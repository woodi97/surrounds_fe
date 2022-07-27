export const commonRegex = {
  name: {
    regex: /^[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/,
    desc: 'First and last name are required(2-10 characters, separated by space)',
  },
  email: {
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    desc: 'Valid Email is required',
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    desc: 'Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character',
  },
}
