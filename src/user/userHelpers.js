export const makeUser = (props) => {
  const user = {};

  user.name = props.name;
  user.picture = props.picture;
  user.location = props.location;

  return user;
};

export const normalize = (users) => ({
  byId: users.reduce((obj, user, index) => ({
    ...obj,
    [index]: makeUser(user),
  }), {}),
  ids: users.map((user, index) => index),
});
