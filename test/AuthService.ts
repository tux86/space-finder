import {Auth, type CognitoUser} from "@aws-amplify/auth";
import {Amplify} from "aws-amplify";

const awsRegion = "eu-west-1"

Amplify.configure({
    Auth: {
        REGION:  awsRegion,
        userPoolId: 'eu-west-1_BSicbmEDv',
        userPoolWebClientId: '5sl6idt5qhv6jmbkgq9uo3efde',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})


export class AuthService {
    public async login(userName: string, password: string ) : Promise<CognitoUser> {
        return  await Auth.signIn(userName, password)
    }
}