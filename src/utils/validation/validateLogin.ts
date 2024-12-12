export const validateUsername = (username: string): string | null => {
  if (username.trim().length < 3)
    return "Tên đăng nhập phải có ít nhất 3 ký tự.";
  if (!/^[a-zA-Z0-9_]+$/.test(username))
    return "Tên đăng nhập chỉ chứa chữ cái, số hoặc dấu gạch dưới.";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
  if (
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[^a-zA-Z0-9]/.test(password)
  ) {
    return "Mật khẩu phải chứa ít nhất một chữ hoa, một số và một ký tự đặc biệt.";
  }
  return null;
};

export const validateForm = (
  username: string,
  password: string
): string | null => {
  return validateUsername(username) || validatePassword(password);
};
