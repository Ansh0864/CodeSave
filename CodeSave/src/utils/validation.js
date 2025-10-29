export const validateTitle = (title) => {
  const trimmedTitle = title?.trim();
  
  if (!trimmedTitle) {
    return { isValid: false, error: 'Title is required' };
  }
  
  if (trimmedTitle.length < 3) {
    return { isValid: false, error: 'Title must be at least 3 characters long' };
  }
  
  if (trimmedTitle.length > 100) {
    return { isValid: false, error: 'Title must be less than 100 characters' };
  }
  
  return { isValid: true };
};

export const validateContent = (content) => {
  const trimmedContent = content?.trim();
  
  if (!trimmedContent) {
    return { isValid: false, error: 'Content is required' };
  }
  
  if (trimmedContent.length < 1) {
    return { isValid: false, error: 'Content cannot be empty' };
  }
  
  if (trimmedContent.length > 100000) {
    return { isValid: false, error: 'Content must be less than 100,000 characters' };
  }
  
  return { isValid: true };
};

export const validateTag = (tag) => {
  const trimmedTag = tag?.trim();
  
  if (!trimmedTag) {
    return { isValid: false, error: 'Tag cannot be empty' };
  }
  
  if (trimmedTag.length < 2) {
    return { isValid: false, error: 'Tag must be at least 2 characters long' };
  }
  
  if (trimmedTag.length > 20) {
    return { isValid: false, error: 'Tag must be less than 20 characters' };
  }
  
  if (!/^[a-zA-Z0-9-_]+$/.test(trimmedTag)) {
    return { isValid: false, error: 'Tag can only contain letters, numbers, hyphens, and underscores' };
  }
  
  return { isValid: true };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' };
  }
  
  return { isValid: true };
};