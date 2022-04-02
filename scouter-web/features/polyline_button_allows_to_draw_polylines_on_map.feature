Feature: polyline button allows to draw polylines on map
  User can draw routes on map by clicking the polyline draw button

  Scenario: By clicking the polyline draw button user starts to draw
    Given User landed on scouter-web
    When User click on draw polyline button
    Then User can draw a route on "map"
