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
            Password:Password
        });

        user.authenticateUser(authDetails,{
            onSuccess:(session)=>{
                const accessToken = session.getAccessToken().getJwtToken();
                console.log('Access Token:', accessToken);

                user.getUserAttributes((err, attributes) => {
                    if (err){
                        console.error('Error fetching user attributes');
                        reject(err);
                    } else{
                        const userData = {
                            username: user.getUsername(),
                            email: attributes.find(attr => attr.getName() === 'email').getValue(),
                            role: attributes.find(attr => attr.getName() === 'custom:Role').getValue()
                        }
                        resolve(userData);
                    }
                })
                console.log("login successful");
                //resolve(result);
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