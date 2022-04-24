Feature: drawing allows to draw polylines on map
  User can draw routes on map by clicking the polyline draw button

  Scenario: By clicking the polyline draw button user starts to draw
    Given user lands on scouter-web
    When user clicks on draw route button
    Then user can draw a route on map
