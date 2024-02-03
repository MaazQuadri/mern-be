import bcrypt from "bcrypt";
export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
export const hashQuestion = async (question) => {
  const saltRounds = 10;
  const hashedQuestion = await bcrypt.hash(question, saltRounds);
  return hashedQuestion;
};

export const compareQuestion = async (question, hashedQuestion) => {
  const result = await bcrypt.compare(question, hashedQuestion);
  return result;
};
