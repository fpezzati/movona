Feature: drawing allows to draw polylines on map
  User can draw routes on map by clicking the polyline draw button

  Scenario: By clicking the polyline draw button user starts to draw
    Given user lands on scouter-web
    When user clicks on draw route button
    Then user can draw a route on map

  Scenario: User cannot draw any route until draw button is pressed
    Given user lands on scouter-web
    When user clicks on draw-route button
    Then user can draw a route on map

  Scenario: By hitting Ctrl + D keys, user triggers the draw mode
    Given user lands on scouter-web
    When user hits ctrl + D keys
    Then user can draw a route on map

  Scenario: Once drawing ends, user is not able to draw again immediately
    Given user lands on scouter-web
    And user drawn a route
    When user completes drawing
    Then user cannot immediately draw any route on map

  Scenario: While drawing routes, route selection is not possible
    Given user lands on scouter-web
    And a route already exists on map
    When user draw a route whitout completing
    Then user cannot click another existing route
