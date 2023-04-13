mod handlers;

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
    use serde_json::Value;
    use serde::{ Deserialize, Serialize };
    use std::net::SocketAddr;
    use jwt_simple::prelude::*;
    use hyper;
    use hyper::Response;
    use std::fs::File;
    use std::io::Read;

    use handlers::github_oauth2::GitHubOAuth2;
    use handlers::github_oauth2::callback;

    pub struct Server {
        host: String,
        port: String,
        public_key: String,
        private_key: String,
        pub conf: String
    }

    use std::any::type_name;

    fn type_of<T>(_: T) -> &'static str {
      type_name::<T>()
    }

    fn load_key(filename: &str) -> std::result::Result<String, Box<dyn std::error::Error>> {
      let mut key = String::new();
      File::open(filename)?.read_to_string(&mut key)?;
      Ok(key)
    }

    impl Server {
        pub fn new(config_doc: &String) -> Server {
          let json_content : Value = serde_json::from_str(&config_doc).expect("Invalid file.");
          Server {
            host: json_content["host"].as_str().unwrap().to_string(),
            port: json_content["port"].to_string(),
            public_key: json_content["private_key"].to_string(),
            private_key: json_content["public_key"].to_string(),
            conf: config_doc.to_string()
          }
        }

        pub async fn start(&self) {

          let public_key = String::from(&self.public_key);
          let routes = Router::new()
            .route("/", get(hello)).layer(Extension(String::from(&self.conf)))
            .route("/check", post(check))
            .route("/login", get(login))
            .route("/verify", post(verify)).layer(Extension(public_key))
            .route("/callback", get(callback)).layer(Extension(GitHubOAuth2::new(String::from(&self.conf))));
          let mut hostport = String::from(&self.host);

          hostport.push_str(":");
          hostport.push_str(&self.port);
          println!("hostport {}", hostport);
          let addr : SocketAddr = hostport.parse::<SocketAddr>().expect("invalid host:port pair");
          axum::Server::bind(
              &addr
          ).serve(routes.into_make_service()).await.unwrap();
        }
    }

    #[derive(Serialize, Deserialize)]
    struct CallbackAuthCode {
      arg_code: String
    }

    async fn login() -> impl IntoResponse {
      println!("Login called");
      Response::builder().
        header("Location", "https://github.com/login/oauth/authorize").
        status(StatusCode::MOVED_PERMANENTLY).body(hyper::Body::empty()).
        unwrap()
    }

    async fn hello(Extension(conf): Extension<String>) -> impl IntoResponse {
      (StatusCode::OK, Json(conf))
    }

    async fn check() -> impl IntoResponse {
      (StatusCode::OK, Json(json!({
        "msg": "Check"
      })))
    }

    async fn verify(Extension(public_key): Extension<String>, headers: HeaderMap) -> impl IntoResponse {
      let authorization_header_value = headers.get(AUTHORIZATION).unwrap().to_str().unwrap();
      println!("AUTHORIZATION: {}", authorization_header_value);
      println!("JWT: {}", str::replace(authorization_header_value, "Bearer ", ""));

      let token_to_check = str::replace(authorization_header_value, "Bearer ", "");
      let token_checker = RS384PublicKey::from_pem(&public_key.to_string()).unwrap();
      match token_checker.verify_token::<UserClaims>(&token_to_check, None) {
        Ok(claims) => StatusCode::OK,
        Err(error) => StatusCode::UNAUTHORIZED
      }
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
