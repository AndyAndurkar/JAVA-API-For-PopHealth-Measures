#!/bin/sh

export CLASSPATH=../me_client/classes:../lib/Healthcare_ME.jar:../lib/json-org.jar:../lib/log4j-1.2.17.jar:../lib/ojdbc6.jar:$CLASSPATH

java test.MEClient "../me_unix.properties"  032012  420  "../data/input" 1
