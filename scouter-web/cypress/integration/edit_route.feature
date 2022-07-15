Feature: edit rotes allows user to add attributes and change route's existing ones
  Scenario: When user clicks on a route, an edit form appears with route's attributes
    Given user lands on scouter-web
    And there is already a route on map
    And user is not drawing
    When user clicks on that geometry
    Then user can update geometry's attributes by the edit form

  Scenario: When user clicks on edit form's cancel button, form closes and feature remains unchanged on map
    Given user land on scouter-web
    And there is a route on map
    And user selected an existing route
    When user clicks on edit form's cancel button
    Then form closes and route remains unchanged

  Scenario: When user clicks on edit form's delete button, form closes and feature is removed from map
    Given user land on scouter-web
    And there is a route on map
    And user selected an existing route
    When user clicks on edit form's cancel button, form closes and route remains unchanged

  Scenario: When user clicks on edit form's save button, form closes and feature appears updated in its attributes on map
    Given user land on scouter-web
    And there is a route on map
    And user selected an existing route
    When user change an attribute's value and clicks on edit form's cancel button
    Then form closes and route has its attributes updated

  Scenario: By clicking on draw button, form closes, feature remains unchanged, draw mode toggles
  Given user land on scouter-web
  And there is a route on map
  And user selected an existing route
  When user clicks on edit form's cancel button
  Then form closes and route has its attributes updated

  Scenario: By clicking on anywhere but not a feature, edit form closes and feature remains unchanged on map
  Given user land on scouter-web
  And there is a route on map
  And user selected an existing route
  When user clicks on edit form's cancel button
  Then form closes and route has its attributes updated

  Scenario: By clicking on a feature, previous edited feature remains unchanged on map, edit form shows clicked feature attributes
  Given user land on scouter-web
  And there is a route on map
  And user selected an existing route
  When user clicks on edit form's cancel button
  Then form closes and route has its attributes updated
