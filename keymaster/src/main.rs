mod server;

use std::fs::File;
use std::io::Read;

#[tokio::main]
async fn main() {
    println!("Hello, world!");
    let srv = server::server::Server {
        host: "0.0.0.0".to_string(),
        port: "3000".to_string(),
        private_key: load_key("private.pem").unwrap(),
        public_key: load_key("public.pem").unwrap()
    };
    srv.start().await;
}

fn load_key(filename: &str) -> Result<String, Box<dyn std::error::Error>> {
  let mut key = String::new();
  File::open(filename)?.read_to_string(&mut key)?;
  Ok(key)
}
