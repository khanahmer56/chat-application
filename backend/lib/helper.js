export const getOtherMembers = (members, userId) => {
  return members.filter(
    (member) => member._id.toString() !== userId.toString()
  );
};
export const getSocket = (users = []) => {
  const sockets = users.map((user) => userIds.get(user._id.toString()));
  return sockets;
};
