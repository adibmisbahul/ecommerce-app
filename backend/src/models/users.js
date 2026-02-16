import db from "../config/conect.js";
const userLogin = async (username, password) => {
  return await db.oneOrNone(
    `select * from users where username =$1 and password = $2`,
    [username, password],
  );
};

const userRegister = async (username, password, email, phone_number) => {
  return await db.one(
    "insert into users (username, password , email , phone_number) values ($1, $2,$3,$4) returning id, username , email , phone_number",
    [username, password, email, phone_number],
  );
};

const alreadyUser = async (username, email, phone_number) => {
  return await db.oneOrNone(
    " select * from users where username = $1 or email = $2 or phone_number = $3",
    [username, email, phone_number],
  );
};

export default { userLogin, userRegister, alreadyUser };
