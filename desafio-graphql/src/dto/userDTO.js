 const  UserDtoPresenter  = (user) => {

    const loginUser = {
        role: user.role,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
        cart: user.cart,
      };

      return loginUser;
}

export default UserDtoPresenter;