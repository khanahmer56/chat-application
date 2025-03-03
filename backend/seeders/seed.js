import { User } from "../models/user.model.js";
import { faker } from "@faker-js/faker";

const createUsers = async (numUsers) => {
  for (let i = 0; i < numUsers; i++) {
    try {
      const userPromise = [];
      for (let i = 0; i < numUsers; i++) {
        userPromise.push(
          User.create({
            name: faker.person.firstName(),
            username: faker.internet.username(),
            password: "1234567",
            avatar: {
              url: faker.image.avatar(),
              public_id: faker.system.fileName(),
            },
          })
        );
      }
      await Promise.all(userPromise);
    } catch (error) {
      console.log(error);
    }
  }
};
export { createUsers };
