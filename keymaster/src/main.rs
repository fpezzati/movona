mod server;

use clap::Parser;

#[derive(Parser, Debug)]
#[command(version, about)]
struct Args {
   #[arg(long)]
   config_file: String
}

#[tokio::main]
async fn main() {
    let args = Args::parse();
    let srv_conf_doc = read_config(&args.config_file.to_string());
    let srv = server::Server::new(&srv_conf_doc);
    srv.start().await;
}

fn read_config(config_file_path: &str) -> String {
  let file_content = std::fs::read_to_string(config_file_path).expect("File does not exist or is corrupted.");
  file_content
}
