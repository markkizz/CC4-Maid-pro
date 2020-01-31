export const handleError = (err) => {
  if (!err.response) {
    return { status: 0, message: err.message };
  } else if (err.response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('store');
    return { status: err.response.status, message: 'Please login before do this' };
  }
  return { status: err.response.status, message: err.response.data.errorMessage };
};