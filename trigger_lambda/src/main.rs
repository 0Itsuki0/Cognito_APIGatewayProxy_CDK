use aws_lambda_events::cognito::CognitoEventUserPoolsPostConfirmation;
use lambda_runtime::{
    service_fn,
    tracing::{self},
    Error, LambdaEvent,
};

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    let service_function = service_fn(|event| async { sqs_handler(event).await });
    lambda_runtime::run(service_function).await?;

    Ok(())
}

async fn sqs_handler(
    event: LambdaEvent<CognitoEventUserPoolsPostConfirmation>,
) -> Result<CognitoEventUserPoolsPostConfirmation, Error> {
    println!("{:?}", event);
    return Ok(event.payload);
}
