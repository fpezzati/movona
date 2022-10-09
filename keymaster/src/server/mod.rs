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
        "msg": "Hello"
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
}
