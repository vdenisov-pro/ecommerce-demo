module.exports.formatPagination = (dataList, count, offset, limit) => ({
  results: dataList,
  count,
  previous: (count >= offset) ? offset : count,
  next: (count >= (offset + limit)) ? count - (offset + limit) : 0,
});
