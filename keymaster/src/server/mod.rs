pub mod server {

    use axum::{
        routing::get,
        routing::post,
        Router,
        Json,
        http::StatusCode,
        response::IntoResponse
    };
    use serde_json::{json};
    use std::net::{
        SocketAddr,
    };
    use jwt_simple::prelude::*;
    use uuid::Uuid;

    pub struct Server {
        pub host: String,
        pub port: String
    }

    impl Server {
        pub async fn start(&self) {
            let routes = Router::new()
              .route("/", get(hello))
              .route("/check", post(check))
              .route("/auth", post(auth));
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

    struct LoginInput {
      username: String,
      password: String
    }

    struct UserClaims {
      user: String,
      uuid: Uuid
    }

    async fn auth(Json(input): Json<LoginInput>) -> impl IntoResponse {
//      let key = HS256Key::generate();
//      let custom_claims = UserClaims {
//        user: input.username,
//        uuid: Uuid::new_v4();
//      }
//      let claims = Claims::with_custom_claims(custom_claims, Duration::from_hours(100));
//      let token = key.authenticate(claims)?;
      (StatusCode::OK, Json(json!({
        "msg": "Auth"
      })))
    }
}
