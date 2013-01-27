#!/bin/sh


export CLASSPATH=../me_client/classes:../lib/Healthcare_ME.jar:../lib/json-org.jar:../lib/log4j-1.2.17.jar:../lib/ojdbc6.jar:$CLASSPATH


java test.RunMeasuresReport "../me.properties"  032012  420 
