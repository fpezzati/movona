Feature: drawing allows to draw polylines on map
  User can draw routes on map by clicking the polyline draw button

  Scenario: By clicking the polyline draw button user starts to draw
    Given user lands on scouter-web
    When user clicks on draw route button
    Then user can draw a route on map

  Scenario: User cannot draw any route until draw button is pressed

  Scenario: Once user clicks on draw button he can draw more than one route subsequently

  Scenario: While drawing routes, user stops draw by clicking the draw button once more

  Scenario: While drawing routes, user cannot edit any existing ones

  Scenario: When user is not drawing, he can edit a route by clicking on that

  Scenario: When user clicks on a route, an edit form appears with route's attributes

  Scenario: When user clicks on edit form's cancel button, form closes and feature remains unchanged on map

  Scenario: When user clicks on edit form's delete button, form closes and feature is removed from map

  Scenario: When user clicks on edit form's save button, form closes and feature appears updated in its attributes on map

  Scenario: By clicking on draw button, form closes, feature remains unchanged, draw mode toggles

  Scenario: By clicking on anywhere but not a feature, edit form closes and feature remains unchanged on map

  Scenario: By clicking on a feature, previous edited feature remains unchanged on map, edit form shows clicked feature attributes

  Scenario: By hitting Ctrl + D keys, user triggers the draw mode
