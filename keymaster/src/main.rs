mod server;

#[tokio::main]
async fn main() {
    println!("Hello, world!");
    let srv = server::server::Server {
        host: "0.0.0.0".to_string(),
        port: "3000".to_string()
    };
    srv.start().await;
}
