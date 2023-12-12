import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from "@/app/services/UserPool";


export const authenticate=(Username,Password)=>{
    return new Promise((resolve,reject)=>{
        const user=new CognitoUser({
            Username:Username,
            Pool:UserPool
        });

        const authDetails= new AuthenticationDetails({
            Username:Username,
            Password
        });

        user.authenticateUser(authDetails,{
            onSuccess:(result)=>{
                console.log("login successful");
                resolve(result);
            },
            onFailure:(err)=>{
                console.log("login failed",err);
                reject(err);
            }
        });
    });
};

export const logout = () => {
    const user = UserPool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
};