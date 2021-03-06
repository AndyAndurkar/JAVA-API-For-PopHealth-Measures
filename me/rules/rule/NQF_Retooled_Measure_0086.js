function NQF_Retooled_Measure_0086(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0086"];
  if (measure==null)
    measure={};

  

  var day = 24*60*60;
  var year = 365*day;
  var effective_date = effDate;
  var latest_birthdate = effective_date - 18*year;
  var earliest_encounter = effective_date - 1*year;
  var all_encounters = normalize(
    measure.encounter_domiciliary_encounter,
    measure.encounter_nursing_facility_encounter,
    measure.encounter_office_outpatient_consult_encounter,
    measure.encounter_ophthalmological_services_encounter);
  
  var population = function() {
    var poag_before_encounter = actionFollowingSomething(
      measure.primary_open_angle_glaucoma_poag_diagnosis_active, all_encounters, 
      earliest_encounter, effective_date);
    var encounters_in_range = inRange(all_encounters, earliest_encounter, effective_date);
      
    return (patient.birthdate<=latest_birthdate) && poag_before_encounter &&
      encounters_in_range;
  }
  
  var denominator = function() {
    return true;
  }
  
  var numerator = function() {
    var procedure = somethingDuringEncounter(measure.optic_nerve_head_evaluation_procedure_performed, 
      all_encounters, earliest_encounter, effective_date);
    return (procedure);
  }
  
  var exclusion = function() {
    var medical = inRange(measure.medical_reason_procedure_not_done, 
      earliest_encounter, effective_date);
    return medical;
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};