export const handleError = (err) => {
  if (!err.response) {
    return { status: 0, message: err.message };
  } else if (err.response.data === 'Unauthorized' && err.response.status === 401) {
    return { status: err.response.status, message: `${err.response.data}! Please login before do that` };
  } else if (err.response.status === 403) {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('store');
    return { status: err.response.status, message: 'Forbidden! Please login before access' };
  }
  return { status: err.response.status, message: err.response.data.errorMessage };
};