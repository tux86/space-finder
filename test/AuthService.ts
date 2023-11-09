import {Auth, type CognitoUser} from "@aws-amplify/auth";
import {Amplify} from "aws-amplify";
import {CognitoIdentityClient} from "@aws-sdk/client-cognito-identity";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";

const awsRegion = "eu-west-1"
const userPoolId = 'eu-west-1_BSicbmEDv'
const identityPoolId = 'eu-west-1:ae721d7d-1166-4061-8a31-49b5f4de30a4'
Amplify.configure({
    Auth: {
        REGION: awsRegion,
        userPoolId,
        userPoolWebClientId: '5sl6idt5qhv6jmbkgq9uo3efde',
        identityPoolId,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})


export class AuthService {
    public async login(userName: string, password: string): Promise<CognitoUser> {
        return await Auth.signIn(userName, password)
    }

    public async generateTemporaryCredentials(user: CognitoUser) {
        const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken()
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${userPoolId}`
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                identityPoolId,
                logins: {
                    [cognitoIdentityPool]: jwtToken
                }
            })
        })

        return await cognitoIdentity.config.credentials()

    }
}