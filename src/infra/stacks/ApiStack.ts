import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {LambdaIntegration, RestApi} from "aws-cdk-lib/aws-apigateway";


interface ApiStackProps extends StackProps {
    spacesLambdaIntegration: LambdaIntegration
}
export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        /*
         TODO: should use HttpAPI (not ready)
         source: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-apigatewayv2-integrations-alpha-readme.html
         */

        const api = new RestApi(this, 'SpacesApi')

        // spaces
        const spacesResource = api.root.addResource('spaces')
        spacesResource.addMethod('GET', props.spacesLambdaIntegration)
        spacesResource.addMethod('POST', props.spacesLambdaIntegration)
        spacesResource.addMethod('PUT', props.spacesLambdaIntegration)
        spacesResource.addMethod('DELETE', props.spacesLambdaIntegration)
       // spacesResource.addMethod('OPTIONS', props.spacesLambdaIntegration)
    }
}
