const APIUtil = {
  followUser: id => (
    $.ajax({
      url: `/users/${id}/follow`,
      method: 'POST',
      dataType: "json"})
  ),

  unfollowUser: id => (
    $.ajax({
      url: `/users/${id}/follow`,
      method: 'DELETE',
      dataType: "json"
    })
  ),

  searchUsers: (queryVal, success) => (
    $.ajax({
      url: `/users/search`,
      dataType: "json",
      data: {
        query: queryVal
      },
      success
    })
  ),

};


module.exports = APIUtil;
