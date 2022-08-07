export const commonRegex = {
  name: {
    regex: /^[a-zA-Z]{4,10}$/,
    desc: 'name is required(4-10 characters)',
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
};
