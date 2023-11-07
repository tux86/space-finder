import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {Code, Function, Runtime} from "aws-cdk-lib/aws-lambda";
import {join} from "path"
export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);


        new Function(this,'HelloLamda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'hello.main',
            code: Code.fromAsset(join(__dirname, '..','..', 'services'))
        })

    }
}
