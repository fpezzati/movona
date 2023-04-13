# Keymaster
Provides:
- jwt validation utility,
- jwt token creation,
- jwt token blacklisting (?).

Built in rust with:
- [axum](https://github.com/tokio-rs/axum) ver 0.5.16.
- [jwt-simple](https://docs.rs/jwt-simple/latest/jwt_simple/) ver 0.10

## 20221111
Right now keymaster provides jwt validation utility and jwt token creation. Jwt validation is straightforward, but what about token creation? Just now keymaster provides a new token, no check if provided username and password match agains anything.

Well, keymaster should match user's credentials agains a database, question is: what keymaster should provide? Let's think about some scenarios.

### Scenario 1
Should provide an http endpoint for user creation which returns an UUID identifier, another application provides user creation web interface and user profile managemnet:
- when user wants to login, he lands on a web page which calls keymaster and gets a token. Web page belongs to application that provides CRUD about user profile, let's call it user application,
- when user wants to register, he lands on user application proper page. User application invokes keymaster creation endpoint and grab the uuid keymaster provides to create a user profile. User credentials and user profile are bound by that uuid.
Big win: this is exactly what I need to go further, no need for user profile right now. Big loss: user creation implies two apps to synchronize.

### Scenario 2
keymaster provides everything. She handles both user credentials and user profile, it becomes a normal front-end back-end app.
Big win: user registration involves only one app. Big loss: putting a lot of stuff early, difficult to integrate. Maybe no big loss..

### Scenario 3
Integrate this with some OAuth or OAuth2 provider.

## 20230122
Raise from the death! Keymaster returns to handle login. Cannot get how to achieve login with nginx (how to put oauth2 token into a httponly secure cookie?). Moreover: I want to share my jwt token! This way I can validate my token instead of asking someone else to do that. Maybe instead of having another pod, gatekeeper and keymaster may be two containers sharing the same pod... Who knows.

## 20230123
Scenario 3 tooks hold on keymaster. Service will provide an endpoint to get a token and an endpoint to verify that.
