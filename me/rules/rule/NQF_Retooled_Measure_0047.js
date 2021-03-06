function NQF_Retooled_Measure_0047(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0047"];
  if (measure==null)
    measure={};

  

  var year = 365*24*60*60;
  var effective_date = effDate;
  var earliest_birthdate = effective_date - 40*year;
  var latest_birthdate = effective_date - 5*year;
  var earliest_encounter = effective_date - year;
  
  var population = function() {
    var correct_age = inRange(patient.birthdate, earliest_birthdate, latest_birthdate);
    var encounters = inRange(measure.encounter_office_outpatient_consult_encounter, earliest_encounter, effective_date);
    var asthma = lessThan(measure.asthma_diagnosis_active, effective_date);
    var persistent_asthma = lessThan(measure.asthma_persistent_diagnosis_active, effective_date);
    return correct_age && (asthma || persistent_asthma) && encounters>=2;
  }
  
  var denominator = function() {
    return true;
  }
  
  var numerator = function() {
    var medication_active = inRange(measure.corticosteroid_inhaled_or_alternative_asthma_medication_medication_active, earliest_encounter, effective_date);
    var medication_order = inRange(measure.corticosteroid_inhaled_or_alternative_asthma_medication_medication_order, earliest_encounter, effective_date);
    return medication_active || medication_order;
  }
  
  var exclusion = function() {
    var not_done_patient = inRange(measure.patient_reason_medication_not_done, earliest_encounter, effective_date);
    var allergy = inRange(measure.corticosteroid_inhaled_or_alternative_asthma_medication_medication_allergy, earliest_encounter, effective_date);
    var adverse = inRange(measure.corticosteroid_inhaled_or_alternative_asthma_medication_medication_adverse_event, earliest_encounter, effective_date);
    var intolerance = inRange(measure.corticosteroid_inhaled_or_alternative_asthma_medication_medication_intolerance, earliest_encounter, effective_date);
    return not_done_patient && (allergy || adverse || intolerance);
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};
