import API from "../Constant/Api";
const LoginUser = async ({ email, password }) => {
  try {
    const res = await fetch(API.USER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();
    if (res.status === 200) {
      return data;
    }
  } catch (err) {
    return err;
  }
};
export default LoginUser;
