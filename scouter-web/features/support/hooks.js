const { Before, After } = require('cucumber');

Before(function() {
  console.log('starting test');
  return this.driver.manage().window().maximize();
});

After(function() {
  console.log('ending test');
  return this.driver.quit();
});
