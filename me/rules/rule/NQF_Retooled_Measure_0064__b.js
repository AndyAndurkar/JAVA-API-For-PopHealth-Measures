function NQF_Retooled_Measure_0064__b(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0064"];
  if (measure==null)
    measure={};

  

  var year = 365 * 24 * 60 * 60;
  var effective_date =                effDate;
  var period_start =                      effective_date - year;
  var earliest_birthdate =                effective_date - 75 * year;
  var latest_birthdate =                  effective_date - 18 * year;
  var earliest_diagnosis =                effective_date - 2 * year;
  var year_prior_to_measurement_period =  effective_date - 3 * year;

  var population = function() {
    return diabetes_population(patient, earliest_birthdate, latest_birthdate);
  }

  var denominator = function() {
    return diabetes_denominator(measure, earliest_diagnosis, effective_date);
  }

  // This numerator function is the only code that is specific to this particular 
  // MU diabetes measure.  All of the other definitions for the initial population, 
  // the denominator, and the exclusions are shared in the 'diabetes_utils.js' file
  // that is located in the /js directory of the project
  // Updated measure (supplemental) specified most RECENT measurement
  var numerator = function() {
    lastLDL = latestValueInDateRange(measure.ldl_test_laboratory_test_result, period_start, effective_date, false);
    if (lastLDL===false)
      return false;
    return (lastLDL < 100.0);
  }

  var exclusion = function() {
    return diabetes_exclusions(measure, earliest_diagnosis, effective_date);
  }

   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};
