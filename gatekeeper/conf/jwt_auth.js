function checktoken(req) {
  console.log(JSON.stringify(req.args.token));
  req.subrequest("/", function(response) {
    if(response.status == 200) {
      var response_as_json = JSON.parse(response.responseBody);
      req.return(201);
    } else {
      req.return(401);
    }
  });
}
