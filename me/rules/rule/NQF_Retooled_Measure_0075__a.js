function NQF_Retooled_Measure_0075__a(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0075"];
  if (measure==null)
    measure={};

  

  var day = 24 * 60 * 60;
  var year = 365 * day;
  var effective_date = effDate;
  var latest_birthdate =   effective_date - (18 * year); // patients who will reach the age of 18 during the “measurement period”

  var earliest_encounter = effective_date - (2 *  year);
  var latest_encounter =   effective_date - (1 *  year) - (61 * day);
  var earliest_procedure = effective_date - (2 *  year);
  var latest_procedure =   effective_date - (1 *  year) - (61 * day);

  var population = function() {
    return (patient.birthdate <= latest_birthdate);
  }

  var denominator = function() {
     return ivd_denominator(measure, effective_date, earliest_procedure, latest_procedure, earliest_encounter, latest_encounter);
  }

  var numerator = function() {

    // If LDL cholesterol lab test was performed, then meet numerator criteria...
    if (measure.ldl_test_laboratory_test_performed) {
      return true;
    }

    // ... or if the HDL, and total cholesterol, and trigylyceried lab tests were
    // performed, then meet numerator criteria...
    if (measure.high_density_lipoprotein_hdl_laboratory_test_performed &&
        measure.total_cholesterol_laboratory_test_performed &&
        measure.triglycerides_laboratory_test_performed) {
      return true;
    }

    // ... otherwise, this patient has not met criteria of either the LDL laboratory test performed or
    // the HDL, and total cholesterol, and trigylyceried lab test performed.
    return false;
  }

  var exclusion = function() {
    return false;
  }

   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};