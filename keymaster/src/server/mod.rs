pub mod server {

    use axum::{
      extract::Extension,
      routing::get,
      routing::post,
      Router,
      Json,
      http::{StatusCode, header::HeaderMap, header::AUTHORIZATION},
      response::IntoResponse
    };
    use serde_json::json;
    use serde::{ Deserialize, Serialize };
    use std::net::SocketAddr;
//    use uuid::Uuid;
    use jwt_simple::prelude::*;

    pub struct Server {
        pub host: String,
        pub port: String,
        pub public_key: String,
        pub private_key: String
    }

    impl Server {
        pub async fn start(&self) {
          let private_key = String::from(&self.private_key);
          let routes = Router::new()
            .route("/", get(hello))
            .route("/check", post(check))
            .route("/auth", post(auth)).layer(Extension(private_key));
          let mut hostport = String::from(&self.host);
          hostport.push_str(":");
          hostport.push_str(&self.port);
          println!("{}", hostport);
          let addr : SocketAddr = hostport.parse().expect("invalid host:port pair");
          axum::Server::bind(
              &addr
          ).serve(routes.into_make_service()).await.unwrap();
        }
    }

    async fn hello() -> impl IntoResponse {
      (StatusCode::OK, Json(json!({
        "msg": "Hello!"
      })))
    }

    async fn check() -> impl IntoResponse {
      (StatusCode::OK, Json(json!({
        "msg": "Check"
      })))
    }

    async fn auth(Extension(private_key): Extension<String>, Json(payload): Json<LoginInput>) -> impl IntoResponse {
      let claims = Claims::create(Duration::from_hours(1));
      let token_signer = RS384KeyPair::from_pem(&private_key.to_string()).unwrap();
      let signed_token = token_signer.sign(claims).unwrap();
      let lo = LoginOutput{
        token: signed_token
      };
      (StatusCode::OK, Json(lo))
    }

    async fn decode(Extension(public_key): Extension<String>, headers: HeaderMap) -> impl IntoResponse {
      let token_to_check = headers.get(AUTHORIZATION).unwrap();
      let token_checker = RS384PublicKey::from_pem(&public_key.to_string()).unwrap();
      match token_checker.verify_token::<UserClaims>(token_to_check.to_str().unwrap(), None) {
        Ok(claims) => StatusCode::OK,
        Err(error) => StatusCode::UNAUTHORIZED
      }
    }

    #[derive(Deserialize)]
    struct LoginInput {
      username: String,
      password: String
    }

    #[derive(Serialize)]
    struct LoginOutput {
      token: String
    }

    #[derive(Serialize, Deserialize)]
    struct UserClaims {
      user: String,
      uuid: String
    }

    struct Error {
      code: i32,
      message: String
    }
}
