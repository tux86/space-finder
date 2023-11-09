import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {
    AuthorizationType,
    CognitoUserPoolsAuthorizer,
    Cors,
    LambdaIntegration,
    MethodOptions,
    ResourceOptions,
    RestApi
} from "aws-cdk-lib/aws-apigateway";
import {IUserPool} from "aws-cdk-lib/aws-cognito";


interface ApiStackProps extends StackProps {
    spacesLambdaIntegration: LambdaIntegration
    userPool: IUserPool
}

export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);


        /*
         TODO: should use HttpAPI (not ready)
         source: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-apigatewayv2-integrations-alpha-readme.html
         */

        const api = new RestApi(this, 'SpacesApi')


        const authorizer = new CognitoUserPoolsAuthorizer(this, 'SpacesAuthorizer', {
            cognitoUserPools: [props.userPool],
            identitySource: 'method.request.header.Authorization'
        })

        authorizer._attachToApi(api)

        const optionsWithAuth: MethodOptions = {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: authorizer.authorizerId
            }
        }

        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS
            }
        }

        // spaces
        const spacesResource = api.root.addResource('spaces', optionsWithCors)
        spacesResource.addMethod('GET', props.spacesLambdaIntegration, optionsWithAuth)
        spacesResource.addMethod('POST', props.spacesLambdaIntegration, optionsWithAuth)
        spacesResource.addMethod('PUT', props.spacesLambdaIntegration, optionsWithAuth)
        spacesResource.addMethod('DELETE', props.spacesLambdaIntegration, optionsWithAuth)

    }
}
