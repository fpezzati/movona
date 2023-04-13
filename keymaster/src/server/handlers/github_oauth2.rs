use axum::{
  Json,
  extract::Query,
  extract::Extension,
  http::StatusCode,
  response::IntoResponse
};
use serde_json::{json, Value};
use hyper;
use hyper_tls::HttpsConnector;
use hyper::header;
use cookie::Cookie;
use serde::{ Deserialize, Serialize };
use http::header::HeaderName;

#[derive(Clone)]
pub struct GitHubOAuth2 {
  client_id: String,
  redirect_uri: String,
  client_secret: String
}

#[derive(Serialize, Deserialize)]
pub struct CallbackAuthCode {
  code: String
}

impl GitHubOAuth2 {

  pub fn new(conf: String) -> GitHubOAuth2 {
    let json_content : Value = serde_json::from_str(&conf).expect("Invalid configuration.");
    GitHubOAuth2 {
      client_id: json_content["github_oauth2"]["client_id"].as_str().unwrap().to_string(),
      redirect_uri: json_content["github_oauth2"]["redirect_uri"].as_str().unwrap().to_string(),
      client_secret: json_content["github_oauth2"]["client_secret"].as_str().unwrap().to_string()
    }
  }
}

pub async fn callback(Query(params): Query<CallbackAuthCode>, Extension(conf): Extension<GitHubOAuth2>) -> impl IntoResponse {
  let params_code = &params.code;

  let mut get_token_url: String = String::from("https://www.github.com/login/oauth/access_token?client_id=");
  get_token_url.push_str(&conf.client_id);
  get_token_url.push_str("&redirect_uri=");
  get_token_url.push_str(&conf.redirect_uri);
  get_token_url.push_str("&client_secret=");
  get_token_url.push_str(&conf.client_secret);
  get_token_url.push_str("&code=");
  get_token_url.push_str(&params_code);
  println!("get_token_url: {}", get_token_url);

  let https = HttpsConnector::new();
  let client = hyper::Client::builder().build::<_, hyper::Body>(https);

  let req = hyper::Request::builder()
    .method(hyper::Method::POST)
    .uri(get_token_url)
    .header("Accept", "application/json")
    .body(hyper::Body::empty()).unwrap();

  match client.request(req).await {
    Ok(resp) => {
      println!("response: {}", resp.status());

      let redirect_uri : String = resp.headers().get("Location").unwrap().to_str().unwrap().to_string();

      if resp.status() == 301 {
        let redirectReq = hyper::Request::builder()
          .method(hyper::Method::POST)
          .uri(redirect_uri)
          .header("Accept", "application/json")
          .body(hyper::Body::empty()).unwrap();
          match client.request(redirectReq).await {
            Ok(mut redirect_resp) => {
              let body = hyper::body::to_bytes(redirect_resp.body_mut()).await.unwrap();
              println!("{} {:?}", redirect_resp.status(), body);
              let body_as_json : Value = serde_json::from_slice(&body).unwrap();
              let bearer_token = body_as_json["access_token"].as_str().unwrap().to_string();
              let cookie = Cookie::build("hey", bearer_token).secure(true).http_only(true).finish();
              let cookie_value = String::from(cookie.value());
              return (
                StatusCode::OK,
                [(header::SET_COOKIE, cookie_value)],
                Json(json!({
                  "msg": "got that cookie"
                }))
              );
            },
            Err(mut redirect_e) => {
              return build_error_response(StatusCode::INTERNAL_SERVER_ERROR, redirect_e.to_string());
            }
          }
      } else {
        return build_error_response(StatusCode::BAD_GATEWAY, "service replies with unexpected response.".to_string());
      }
    },
    Err(e) => {
      return build_error_response(StatusCode::INTERNAL_SERVER_ERROR, e.to_string());
    }
  }
}

#[derive(Serialize, Deserialize)]
struct ErrorResponsePayload {
  error: String
}

fn build_error_response(status_code : StatusCode, error_msg : String) -> (StatusCode, [(HeaderName, String); 1], Json<Value>) {
  let error_msg_as_json = ErrorResponsePayload {
    error: error_msg
  };
  return (
    status_code,
    [(header::CONTENT_TYPE, "application/json".to_string())],
    Json(serde_json::to_value(error_msg_as_json).unwrap())
  );
}
