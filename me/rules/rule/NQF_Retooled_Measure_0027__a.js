function NQF_Retooled_Measure_0027__a(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0027"];
  if (measure==null)
    measure={};

  

  var year = 365*24*60*60;
  var effective_date = effDate;
  var latest_birthdate = effective_date - 18*year;
  var earliest_encounter = effective_date - 2*year;
  var earliest_tobacco_user = effective_date - 1*year;
  
  var population = function() {
    return (patient.birthdate<=latest_birthdate);
  }
  
  var denominator = function() {
    return inRange(measure.encounter_outpatient_encounter, earliest_encounter, effective_date);
  }
  
  var numerator = function() {
    return inRange(measure.tobacco_user_physical_exam_finding, earliest_tobacco_user, effective_date);
  }
  
  var exclusion = function() {
    return false;
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};