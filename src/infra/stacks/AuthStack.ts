import {CfnOutput, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import { ITable} from "aws-cdk-lib/aws-dynamodb";
import {CfnUserPool, CfnUserPoolGroup, UserPool, UserPoolClient} from "aws-cdk-lib/aws-cognito";
import {CfnUserGroup} from "aws-cdk-lib/aws-elasticache";

export class AuthStack extends Stack {

    public userPool: UserPool;
    public userPoolClient: UserPoolClient;

    public readonly spacesTable : ITable

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.createUserPool();
        this.createUserPoolClient()
        this.createAdminsGroup()

    }

    private createUserPool() {
        this.userPool = new UserPool(this, 'SpaceUserPool', {
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true
            }
        })

        new CfnOutput(this, 'SpaceUserPoolId', {
            value: this.userPool.userPoolId
        })
    }

    private createUserPoolClient() {
        this.userPoolClient = this.userPool.addClient('SpaceUserPoolClient', {
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            }
        })

        new CfnOutput(this, 'SpaceUserPoolClientId', {
            value: this.userPoolClient.userPoolClientId
        })
    }



    private createAdminsGroup() {
       new CfnUserPoolGroup(this, 'SpaceAdmins', {
           userPoolId: this.userPool.userPoolId,
           groupName: 'admins'
       })
    }

}