import db from "../config/conect.js";
const queryLogin = async (username, password) => {
  return await db.oneOrNone(
    `select * from users where username =$1 and password = $2`,
    [username, password],
  );
};

export default { queryLogin };
