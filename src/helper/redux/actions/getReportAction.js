export const topHeadlineRequest = params => ({
  type: 'API_REQUEST',
  payload: {
    page: params.page,
  },
});
