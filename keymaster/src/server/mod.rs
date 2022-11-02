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
    use std::sync::Arc;

    pub struct Server {
        pub host: String,
        pub port: String,
        pub public_key: String,
        pub private_key: String
    }

    impl Server {
        pub async fn start(&self) {
          let public_key = String::from(&self.public_key.clone());
          let routes = Router::new()
            .route("/", get(hello))
            .route("/check", post(check))
            .route("/auth", post(auth))
            .route("/auth2", post(auth2)).layer(Extension(public_key));
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

    async fn auth() -> impl IntoResponse {
      (StatusCode::OK, Json(json!({
        "msg": "Auth"
      })))
    }

    async fn auth2(server_config: Extension<&str>, Json(payload): Json<LoginInput>) -> impl IntoResponse {
//      let claims = Claims::create(Duration::from_hours(1));
//      RS384PublicKey::from_pem("something").sign(claims)?;
//      println!("wtf {}", server_config);
      let lo = LoginOutput{
        token: payload.username,
        something: "WTF".to_string()
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
//      type: "Bearer".to_string();
      token: String,
      something: String
    }

    struct Error {
      code: i32,
      message: String
    }

    struct UserClaims {
      user: String,
      uuid: Uuid
    }

/*
    async fn auth(Json(input): Json<LoginInput>) -> impl IntoResponse {
      let key = HS256Key::generate();
      let custom_claims = UserClaims {
        user: input.username,
        uuid: Uuid::new_v4();
      }
      let claims = Claims::with_custom_claims(custom_claims, Duration::from_hours(100));
      let token = key.authenticate(claims)?;
      (StatusCode::OK, Json(json!({
        "msg": "Auth"
      })))
    }
*/
}
