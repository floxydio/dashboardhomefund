// ----------------------------------------------------------------------

const nameUser = localStorage.getItem("name_user")

const account = {
  displayName: nameUser === null || nameUser === undefined ?'Developer Admin' : nameUser,
  email: 'homefund.com',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
