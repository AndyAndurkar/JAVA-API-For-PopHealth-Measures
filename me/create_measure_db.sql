/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2012</p>
 * @author Andy Andurkar
 * @emil 
 * @version 1.1
 */
 
 
DROP TABLE PATIENT CASCADE CONSTRAINTS;

CREATE TABLE PATIENT
(
  patient_id         VARCHAR2(10)                 NOT NULL,
  first_name         VARCHAR2(25)                 NOT NULL,
  last_name          VARCHAR2(25)                 NOT NULL,
  gender             VARCHAR2(1)                  NOT NULL,
  birthday_sec       VARCHAR2(12),
  payload            VARCHAR2(2000),
  CREATE_DATE_TIME   DATE                         DEFAULT SYSDATE NOT NULL  
)
LOGGING 
NOCACHE
NOPARALLEL;

ALTER TABLE PATIENT ADD (
  CONSTRAINT PK_PATIENT PRIMARY KEY (patient_id));


DROP TABLE PROVIDER_MEASURE CASCADE CONSTRAINTS;

CREATE TABLE PROVIDER_MEASURE
(
  measure_period         VARCHAR2(6)                 NOT NULL,
  provider_id            VARCHAR2(10)                NOT NULL,
  measure_id             VARCHAR2(6)                 NOT NULL,
  sub_id                 VARCHAR2(1)                 NOT NULL,
  patient_id             VARCHAR2(10)                NOT NULL,
  population             VARCHAR2(1)                 NOT NULL,
  denominator            VARCHAR2(1)                 NOT NULL,
  numerator              VARCHAR2(1)                 NOT NULL,
  antinumerator          VARCHAR2(1)                 NOT NULL,
  exclusions             VARCHAR2(1)                 NOT NULL,
  CREATE_DATE_TIME   DATE                         DEFAULT SYSDATE NOT NULL  
)
LOGGING 
NOCACHE
NOPARALLEL;

ALTER TABLE PROVIDER_MEASURE ADD (
  CONSTRAINT PK_PROVIDER_MEASURE PRIMARY KEY (measure_period,provider_id,measure_id,sub_id,patient_id));