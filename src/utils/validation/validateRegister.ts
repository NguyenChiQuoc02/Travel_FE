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

export const validateEmail = (email: string): string | null => {
  if (!/\S+@\S+\.\S+/.test(email)) return "Email không hợp lệ.";
  return null;
};

export const validatePhoneNumber = (phoneNumber: string): string | null => {
  if (!/^\d{10}$/.test(phoneNumber))
    return "Số điện thoại phải có đúng 10 chữ số.";
  return null;
};

export const validateForm = (
  username: string,
  password: string,
  email?: string,
  phoneNumber?: string
): string | null => {
  return (
    validateUsername(username) ||
    validatePassword(password) ||
    validateEmail(email || "") ||
    validatePhoneNumber(phoneNumber || "")
  );
};
