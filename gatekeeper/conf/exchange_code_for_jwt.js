function exchange_code_for_token(req, client_id, client_secret, callback) {
  var subreq_url = "https://github.com/login/oauth/access_token";
  subreq_url += "?client_id=" + client_id;
  subreq_url += "&redirect_uri=" + redirect_uri;
  subreq_url += "&client_secret=" + client_secret;
  subreq_url += "&code=" + "$arg_code";
  req.subrequest(subreq_url, function(response) {
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
export default { exchange_code_for_token };
