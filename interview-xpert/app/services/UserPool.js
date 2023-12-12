import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_UFjrbYPBW",
    ClientId: "6vl4rl8adq4agca0svdem9qmec"
}

export default new CognitoUserPool(poolData);