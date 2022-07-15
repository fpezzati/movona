Feature: user can draw, remove, update geometries in order to build a graph implementing a service map

  Scenario: user is able to draw geometries on map at any time
    Given user lands on scouter-web
    When user clicks on map
    Then user places a verticle on map

  Scenario: drawing automatically stops after 2 seconds of inactivity
    Given user lands on scouter-web
    When user clicks on map
    And user clicks on map again
    And user waits for 2 seconds
    And user click on map again
    Then user draws a new geometry

  Scenario: by clicking on an existing geometry on map, user can update its attributes
    Given user lands on scouter-web
    And there is already a geometry on map
    When user clicks on that geometry
    Then user can update geometry's attributes

  Scenario: by clicking on an existing geometry on map, user can add new attributes
    Given user lands on scouter-web
    And there is already a geometry on map
    When user clicks on that geometry
    Then user can update geometry's attributes

  Scenario: dragging an existing verticle on map causes that place coordinates to update and route changes its shape accordingly
    Given user lands on scouter-web
    And there already is a geometry on map
    When user drag that place
    Then place's coordinates update accordingly

  Scenario: by selecting an existing geometry on map, user can remove it
    Given user lands on scouter-web
    And there already is a geometry on map
    And user select that geometry on map
    When user clicks on the 'remove-geom' button
    Then geometry is removed from map
