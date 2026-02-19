import pgPromise from "pg-promise";
const pgp = pgPromise();

const db = pgp("postgres://postgres:adib101812@localhost:5432/ecomerce");

db.connect()
  .then((obj) => {
    console.log("✅ conected to postgresSQL");
    obj.done();
  })
  .catch((error) => {
    console.error("❌ failed to conect", error.message);
  });

export default db;
