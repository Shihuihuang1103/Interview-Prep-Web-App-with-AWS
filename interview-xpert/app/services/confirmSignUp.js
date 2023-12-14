import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

const confirmSignUp = (username, code) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: UserPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmSignUp(code, true, (err, result) => {
      if (err) {
        console.error(err);
        reject('Error confirming sign up');
      } else {
        console.log('Sign up confirmed successfully:', result);
        resolve('Sign up confirmed successfully');
      }
    });
  });
};

export { confirmSignUp };
