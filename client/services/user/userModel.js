const userProto = {
  get introduce() {
    return `Hey, my name is ${this.name}`;
  },
};

export const makeUser = (name) => {
  const user = Object.create(userProto);
  user.name = name;
  return user;
};

export const normalize = (users) => ({
  byId: users.reduce((obj, user, index) => ({ ...obj, [index]: user }), {}),
  ids: users.map((user, index) => index),
});

export const getAll = (ids, byId) =>
  ids.map((userId) => byId[userId]);
