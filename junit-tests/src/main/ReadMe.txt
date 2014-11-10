Espresso Test Framework

In ExpressoTestFramework.js - around line 190
look for use of KahunaEnvironment and KahunaEnvironmentSecondary
They are set for localhost/local database debugging (mysql, oracle is remote)

Jenkins builds use env vars to set to houston.d/dbdev
You can edit the file (DO NOT CHECK IN) or setup environment vars for when you run (an eclipse journey)


test should run locally with just a 'Debug in jUnit' click.



------------------

This is NOT accurate below here - it is thinking work, eventually
to be adjusted and implemented or just plain discarded.


The Espresso Test Framework (ETF) can be used in 3 environments.

1) In RhinoScript, via command line, jUnit, or inside of Eclipse

2) In Node.js

3) Inside a browser such as Firefox.

The features in each are slightly different, but the main feature of testing
Espresso Logic REST/JSON Servers works in all three.

Currently, only RhinoScript is supported.  The other environments will
be made available in a future release, prioritized based on customer demand.

Of course, as an Espresso Logic Server is just a standard REST/JSON server,
you can roll your own.



RhinoScript

The RhinoScript version of ETF is designed to run from both a command line,
as well as from within jUnit, either within Eclipse or from an ANT script.
Using Maven is explicitly supported, but a knowledgable Maven expert should
be able to integrate if desired.

Overview

RhinoScript ETF is packaged as a single .jar Espresso-ETF-Rhino.jar.
Place this file on your classpath and have fun.

TODO - complete the instructions


Using ETF

Within a JavaScript file,

// this will load ETF, configure Rhino with extensions.
// Given true, it will print a brief success message.
var etf = Packages.com.espresso.testing.EspressoTestFramework.configure(true);

var env = etf.loadEnvironment();
var myconfig = {}
if ('undefined' !== env.KahunaEnvironment) {
    etf.updateConfig(myconfig, etf.loadConfig('/config/' + env.KahunaEnvironment + '.json'));
    if ('undefined' !== env.KahunaEnvironmentSecondary) {
        etf.updateConfig(myconfig, etf.loadConfig('/config/' + env.KahunaEnvironment + '+' + env.KahunaEnvironmentSecondary + '.json'));
    }

    etf.updateConfig(myconfig, etf.loadConfig('config/' + env.KahunaEnvironment + '.json'));
    if ('undefined' !== env.KahunaEnvironmentSecondary) {
        etf.updateConfig(myconfig, etf.loadConfig('config/' + env.KahunaEnvironment + '+' + env.KahunaEnvironmentSecondary + '.json'));
    }
}

For running within jUnit, 

var 