import {AuthService} from "./AuthService";
import {ListBucketsCommand, S3Client} from "@aws-sdk/client-s3";


async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login('xxx','xxxx')
    console.log('TOKEN', loginResult.getSignInUserSession().getIdToken().getJwtToken())

    const credentials = await service.generateTemporaryCredentials(loginResult)
    console.log('CREDENTIALS', credentials)

    const buckets = await listBuckets(credentials);
    console.log('BUCKETS', buckets)
}

async function listBuckets(credentials: any) {
    const client = new S3Client({
        //credentials
    });

    const command  = new ListBucketsCommand({})
    return await client.send(command)
}

testAuth().then(r => ( console.log('')))