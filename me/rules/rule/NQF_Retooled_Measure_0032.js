function NQF_Retooled_Measure_0032(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0032"];
  if (measure==null)
    measure={};

  

  var year = 365*24*60*60;
  var effective_date = effDate;
  var earliest_birthdate = effective_date - 64*year;
  var latest_birthdate = effective_date - 23*year;
  var earliest_encounter = effective_date - 2*year;
  var earliest_pap = effective_date - 3*year;
  
  var population = function() {
    return inRange(patient.birthdate, earliest_birthdate, latest_birthdate);
  }
  
  var denominator = function() {
    var outpatient_encounter = inRange(measure.encounter_outpatient_encounter, earliest_encounter, effective_date);
    var obgyn_encounter = inRange(measure.encounter_ob_gyn_encounter, earliest_encounter, effective_date);
    var hysterectomies = normalize(measure.hysterectomy_procedure_performed);
    var no_hysterectomy = hysterectomies.length==0 || (_.min(hysterectomies)>=effective_date);
    return ((outpatient_encounter || obgyn_encounter) && no_hysterectomy);
  }
  
  var numerator = function() {
    return inRange(measure.pap_test_laboratory_test_result, earliest_pap, effective_date);
  }
  
  var exclusion = function() {
    return false;
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};
