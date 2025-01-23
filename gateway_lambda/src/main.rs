use anyhow::Context;
use axum::http::header::CONTENT_TYPE;
use axum::http::{HeaderMap, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::get;
use axum::Router;
use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use serde_json::{json, Value};

use lambda_http::{run, tracing, Error};
use std::env::set_var;

#[tokio::main]
async fn main() -> Result<(), Error> {
    set_var("AWS_LAMBDA_HTTP_IGNORE_STAGE_IN_PATH", "true");

    tracing::init_default_subscriber();

    let app = Router::new().route("/", get(lambda_handler));
    run(app).await
}

async fn lambda_handler(headers: HeaderMap) -> Response {
    let mut json_header = HeaderMap::new();
    json_header.insert(CONTENT_TYPE, "application/json".parse().unwrap());

    match decode_auth(headers) {
        Ok(token) => {
            let response = Response::new(
                json!({
                    "token":token
                })
                .to_string(),
            );
            return (json_header, response).into_response();
        }
        Err(err) => {
            let mut response = Response::new(
                json!({
                    "error":err.to_string()
                })
                .to_string(),
            );
            *response.status_mut() = StatusCode::BAD_REQUEST;
            return (json_header, response).into_response();
        }
    };
}

fn decode_auth(headers: HeaderMap) -> anyhow::Result<Value> {
    let auth_string = headers
        .get("Authorization")
        .context("Authorization header is not present.")?
        .to_str()
        .context("Authorization header is not valid UTF8.")?;

    let key = DecodingKey::from_secret(&[]);
    let mut validation = Validation::new(Algorithm::HS256);
    validation.insecure_disable_signature_validation();
    validation.validate_aud = false;
    validation.validate_exp = true;
    validation.validate_nbf = false;

    let token_data = decode::<Value>(&auth_string, &key, &validation)?;
    Ok(json!({
        "claims": token_data.claims,
        "headers": token_data.header,
    }))
}
