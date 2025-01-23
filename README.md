# Sample CDK for API Gateway Lambda Proxy with Cognito


Specifically, this demo includes
1. CDK Stack for constructing Lambda, API Gateway, Congito User Pool, Domain, and Client with Managed Login (Custom branding), and Lambda Trigger
2. Sample API Gateway Lambda to decode Access Token to retrieve user information
3. Sample Handler Lambda to handle Cognito triggered events
3. Sample Frontend next js app to handle login and obtain ID Token, access token and etc.


For more details, please check out my blog: [AWS Cognito For API Gateway (Lambda Proxy) Access Control: Step By Step](https://medium.com/@itsuki.enjoy/aws-cognito-for-api-gateway-lambda-proxy-access-control-step-by-step-48b03475a78f)