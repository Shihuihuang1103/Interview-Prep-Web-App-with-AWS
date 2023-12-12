import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_mhOY7Jue5",
    ClientId: "1ct911qdafcsgmqdcg9aopbge2"
}

export default new CognitoUserPool(poolData);