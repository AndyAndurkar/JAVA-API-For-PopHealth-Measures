function NQF_Retooled_Measure_0033__b(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0033"];
  if (measure==null)
    measure={};
  
  

  var day = 24*60*60;
  var year = 365*day;
  var effective_date = effDate;
  var earliest_birthdate = effective_date - 19*year;
  var latest_birthdate = effective_date - 15*year;
  var earliest_encounter = effective_date - 1*year;
  var pregnancy_tests = normalize(measure.pregnancy_test_laboratory_test_performed,
    measure.pregnancy_test_laboratory_test_result);
  
  var population = function() {
    return inRange(patient.birthdate, earliest_birthdate, latest_birthdate);
  }
  
  var denominator = function() {
    return chlamydiaDenominator(measure, pregnancy_tests, earliest_encounter, effective_date);
  }
  
  var numerator = function() {
    var screening = normalize(measure.chlamydia_screening_laboratory_test_performed,
      measure.chlamydia_screening_laboratory_test_result);
    return inRange(screening, earliest_encounter, effective_date);
  }
  
  var exclusion = function() {
    return chlamydiaExclusion(measure, pregnancy_tests, earliest_encounter, effective_date);
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};