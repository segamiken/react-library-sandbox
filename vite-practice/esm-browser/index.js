import { filter } from "./node_modules/lodash-es/lodash.js";

const users = [
  { name: "tomas", age: 10 },
  { name: "peter", age: 20 },
];
const filterUsers = filter(users, (user) => user.age > 15);

console.log(filterUsers);
