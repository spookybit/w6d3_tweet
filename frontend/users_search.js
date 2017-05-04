const APIUtil = require('./api_util');
const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor(nav) {
    this.$nav = $(nav);
    this.$input = this.$nav.children('input');
    this.$ul = this.$nav.children('.users');
    this.handleInput();
  }

  handleInput() {
    this.$input.on("keyup", (event) => {
      console.log(this.$ul);
      console.log(this.$input.val());
      APIUtil.searchUsers(this.$input.val(), this.renderResults.bind(this));
    });
  }

  renderResults(el) {
    this.$ul.html("");
    el.forEach((result) => {
      let $li = $("<li></li>");
      $li.text(result.username);
      let $button = $("<button></button>");
      $button.attr('data-user-id', result.id);
      $button.attr('data-initial-follow-state', () => {
        if (result.followed) {
          return 'followed';
        } else {
          return 'unfollowed';
        }
      });
      $button.addClass('follow-toggle');
      $li.append($button);
      this.$ul.append($li);
      new FollowToggle($button);
    });
  }
}

module.exports = UsersSearch;
