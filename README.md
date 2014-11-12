rest-api-testing-framework
==========================

Espresso Logic has written 2 different frameworks (JUNIT) and Selenium/Protractor for testing REST API and Reactive Logic. Each Framework is a stand-alone unit and can be installed and run idenpedently of each other.

The Selenium/Protractor uses Node.js and requires Espresso Logic and Live Browser (an HTML5/AngularJS instant view of your REST API data).

The JUnit and JavaScript use a different technique and will work with any REST API server  - however, it is optimized for Espresso Logic which returns a transaction summary of all tables impacted by an upsert. 
