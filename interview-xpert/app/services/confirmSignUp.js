import { CognitoUser } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
//获取email


//验证email
const cognitoUser = new CognitoUser(userData);

cognitoUser.getAttributeVerificationCode('email', {
  onSuccess: function (result) {
    console.log('Verification code sent to email successfully.');
  },
  onFailure: function (err) {
    console.error(err);
  }
});

cognitoUser.verifyAttribute('email', '...', { 
  onSuccess: function (result) {
    console.log('Email verified successfully.');
  },
  onFailure: function (err) {
    console.error(err);
  }
});

export { CognitoUser, AWS, poolData, userData, cognitoUser };
