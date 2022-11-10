mod server;

use std::fs::File;
use std::io::Read;
use clap::Parser;

#[derive(Parser, Debug)]
#[command(version, about)]
struct Args {
   #[arg(long, default_value = "0.0.0.0")]
   host: String,

   #[arg(long, default_value = "3000")]
   port: String,

   #[arg(long, default_value = "./private_key.pem")]
   private_key: String,

   #[arg(long, default_value = "./public_key.pem")]
   public_key: String
}

#[tokio::main]
async fn main() {
    let args = Args::parse();

    let srv = server::server::Server {
        host: args.host.to_string(),
        port: args.port.to_string(),
        private_key: load_key(&args.private_key).unwrap(),
        public_key: load_key(&args.public_key).unwrap()
    };
    srv.start().await;
}

fn load_key(filename: &str) -> Result<String, Box<dyn std::error::Error>> {
  let mut key = String::new();
  File::open(filename)?.read_to_string(&mut key)?;
  Ok(key)
}
