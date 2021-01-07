import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("xxxxxx", 10),
    isAdmin: true,
  },
  {
    name: "Fadmin User",
    email: "Fadmin@example.com",
    password: bcrypt.hashSync("xxxxxx", 10),
  },
  {
    name: "Dadmin User",
    email: "dadmin@example.com",
    password: bcrypt.hashSync("xxxxxx", 10),
  },
];

export default users;
