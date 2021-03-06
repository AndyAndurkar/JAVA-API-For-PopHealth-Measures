function NQF_Retooled_Measure_0052(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0052"];
  if (measure==null)
    measure={};

  

  var day = 24*60*60;
  var year = 365*day;
  var effective_date = effDate;
  var earliest_birthdate = effective_date - 49*year;
  var latest_birthdate = effective_date - 18*year;
  var earliest_encounter = effective_date - 1*year;
  var first_diagnosis = null;
  
  var population = function() {
    return (inRange(patient.birthdate, earliest_birthdate, latest_birthdate));
  }
  
  var denominator = function() {
    var all_diagnoses = selectWithinRange(normalize(measure.low_back_pain_diagnosis_active),
      earliest_encounter, effective_date);
    if (all_diagnoses==null || all_diagnoses.length==0)
      return false; // no need to check this further at the end of the function
    first_diagnosis = _.min(all_diagnoses);
    
    var encounter = inRange(measure.encounter_ambulatory_including_orthopedics_and_chiropractics_encounter,
      earliest_encounter, effective_date);    
    var recent_prior_diagnosis = inRange(measure.low_back_pain_diagnosis_active,
      first_diagnosis-180*day, first_diagnosis-1); // -1 since inRange is inclusive
    var cancer = inRange(measure.cancer_diagnosis_active, effective_date-2*year,
      effective_date);
    var trauma = inRange(measure.trauma_diagnosis_active, effective_date-2*year,
      effective_date);
    var drug_abuse = inRange(measure.iv_drug_abuse_diagnosis_active, effective_date-2*year,
      effective_date);
    var impairment = inRange(measure.neurologic_impairment_diagnosis_active, effective_date-2*year,
      effective_date);
    
    return (encounter && !(recent_prior_diagnosis || cancer || trauma || drug_abuse || impairment));
  }
  
  var numerator = function() {
    return (!inRange(measure.imaging_study_spinal_diagnostic_study_performed,
      first_diagnosis, first_diagnosis+28*day));
  }
  
  var exclusion = function() {
    return false;
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};