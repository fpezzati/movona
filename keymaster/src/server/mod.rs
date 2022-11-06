pub mod server {

    use axum::{
      extract::Extension,
      routing::get,
      routing::post,
      Router,
      Json,
      http::StatusCode,
      response::IntoResponse
    };
    use serde_json::json;
    use serde::{ Deserialize, Serialize };
    use std::net::SocketAddr;
    use uuid::Uuid;
    use jwt_simple::prelude::*;
    use std::fs::File;
    use std::io::Read;

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

    #[derive(Deserialize)]
    struct LoginInput {
      username: String,
      password: String
    }

    #[derive(Serialize)]
    struct LoginOutput {
      token: String
    }

    struct Error {
      code: i32,
      message: String
    }

    struct UserClaims {
      user: String,
      uuid: Uuid
    }
}
