export const handleError = (err) => {
  if (!err.response) {
    return { status: 0, message: err.message };
  } else if (err.response.data === 'Unauthorized') {
    return { status: err.response.status, message: err.response.data };
  } else if (err.response.status === 403) {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('store');
    return { status: err.response.status, message: 'Forbidden! Please login before Access' };
  }
  console.info('error', err.response);
  return { status: err.response.status, message: err.response.data.errorMessage };
};