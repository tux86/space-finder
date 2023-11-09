import {AuthService} from "./AuthService";


async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login('xxxx','xxxx')
    console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken())
}

testAuth().then(r => ( console.log('')))