//require('babel-register');
const assert = require('assert');
const { Given, When, Then, After } = require('@cucumber/cucumber');
const selenium = require('selenium-webdriver');

var driver = new selenium.Builder().forBrowser('firefox').build();

Given('User landed on scouter-web', function (next) {
  driver.get('http://192.168.49.2:30000/scouter').then(next);
});

When('User click on draw polyline button', function (next) {
  this.driver.findElement(By.id('polyline_draw_button')).click();
});

Then('User can draw a route on map', function () {
   this.driver.findElement(By.id('map')).then((map)=>{
     let mapOffset = map.getRect();
     let x = mapOffset.x;
     let y = mapOffset.y;
     const action = driver.actions({async: true});
     map.click();
     action.move({x:parseInt(x+10), y:parseInt(y+10)}).pause(100).perform();
     map.click();
     this.driver.findElement(By.css('path'));
   });
});
