import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

export class VpcChatBotStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //================================
    //Our VPC
    //================================

    const vpc = new ec2.Vpc(this, "VpcChatBot", {
      
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "Ingress",
          subnetType: ec2.SubnetType.ISOLATED,
        },
      ],
    });

    //================================
    //Our Lambda
    //================================

    const handler = new lambda.Function(this, "Lambda", { 
      runtime: lambda.Runtime.NODEJS_10_X,
      code: new lambda.AssetCode("functions"),
      handler: "index.hello_world",
      vpc: vpc,
      vpcSubnets:
        {
          subnetType: ec2.SubnetType.ISOLATED                                                                                                               
        }
    });

    //================================
    //Our ApiGateWay
    //================================

    const apigateway = new apigw.LambdaRestApi(this, "apiForchat", {
      handler: handler,
    });
  }
}
