function checktoken(req) {
  req.subrequest("/check_github_token", function(response) {
    if(response.status == 200) {
      var response_as_json = JSON.parse(response.responseBody);
      if (response_as_json.active == true) {
        req.return(204);
      } else {
        req.return(403);
      }
    } else {
      req.return(401);
    }
  });
};

function setcookieswithtoken(req, data, flags) {
  var payload = data.split("&");
//  ngx.log(ngx.ERR, ">>>>>>payload: " + payload);
  var token = payload[0].substring(payload[0].indexOf("=") + 1);
  ngx.log(ngx.ERR, ">>>>>>token: " + token);
  ngx.log(ngx.INFO, ">>>>>>token: " + token);
//  var user = payload[2].substring(payload[2].indexOf("=") + 1);
//  ngx.log(ngx.ERR, ">>>>>>user: " + token);
  var cookies = req.headersOut['Set-Cookie'];
  cookies.push("token=" + token +"; HttpOnly; Secure");
  req.headersOut['Set-Cookie'] = cookies;
//  req.headersOut['Set-Cookie'].push("user=" + user);
  req.sendBuffer(data, flags);
}

export default { checktoken, setcookieswithtoken };
