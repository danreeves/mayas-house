use rocket;
use rocket_contrib::serve::StaticFiles;
use std::thread;
use ws;

fn main() {
    thread::spawn(move || {
        ws::listen("127.0.0.1:3000", move |out| move |msg| out.broadcast(msg)).unwrap();
    });
    rocket::ignite()
        .mount("/", StaticFiles::from("./static"))
        .launch();
}
