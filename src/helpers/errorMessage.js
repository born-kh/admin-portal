export const errorMessage = error => {
  if (error.status === 401) {
    return '401';
  } else {
    return error.message;
  }
};
