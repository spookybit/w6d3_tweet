const APIUtil = require('./api_util');

class FollowToggle {
  constructor (button) {
    this.$button = $(button);
    this.userId = this.$button.data("user-id");
    this.initialFollowState = this.$button.data("initial-follow-state");
    this.render();
    this.handleClick();
  }

  render () {
    if (this.initialFollowState === "unfollowed") {
      this.$button.text("Follow").prop('disabled', false);
    } else if (this.initialFollowState === "following"){
      this.$button.prop('disabled', true);
    } else if (this.initialFollowState === "unfollowing") {
      this.$button.prop('disabled', true);
    } else {
      this.$button.text("Unfollow").prop('disabled', false);
    }
  }

  handleClick() {
    this.$button.on("click", (event) => {
      event.preventDefault();

      if (this.initialFollowState === "unfollowed") {

        this.initialFollowState = "following";
        this.render();

        APIUtil.followUser(this.userId)
          .then(() => {
            this.changeFollowState("followed");
            this.render();
          });

      } else {

        this.initialFollowState = "unfollowing";
        this.render();

        APIUtil.unfollowUser(this.userId)
          .then(() => {
          this.changeFollowState("unfollowed");
          this.render();
        });
      }
    });
  }

  changeFollowState(followState) {
    this.initialFollowState = followState;
  }
}

module.exports = FollowToggle;
