function NQF_Retooled_Measure_0043(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0043"];
  if (measure==null)
    measure={};

  

  var year = 365*24*60*60;
  var effective_date = effDate;
  var earliest_birthdate = effective_date - 65*year;
  var earliest_encounter = effective_date - 1*year;
  
  var population = function() {
    return (patient.birthdate <= earliest_birthdate);
  }
  
  var denominator = function() {
    outpatient_encounter = inRange(measure.encounter_outpatient_encounter, earliest_encounter, effective_date);
    return (outpatient_encounter);
  }
  
  var numerator = function() {
    vaccination = lessThan(measure.pneumococcal_vaccination_all_ages_procedure_performed, effective_date);
    vaccine = lessThan(measure.pneumococcal_vaccine_all_ages_medication_administered, effective_date);
    return vaccination || vaccine;
  }
  
  var exclusion = function() {
    return false;
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};