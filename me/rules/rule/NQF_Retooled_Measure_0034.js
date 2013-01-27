function NQF_Retooled_Measure_0034(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0034"];
  if (measure==null)
    measure={};

  

  var year = 365*24*60*60;
  var effective_date = effDate;
  var latest_birthdate = effective_date - 50*year;
  var earliest_birthdate = effective_date - 75*year;
  var earliest_encounter = effective_date - 2*year;
  var one_year = effective_date - 1*year;
  var five_years = effective_date - 5*year;
  var ten_years = effective_date - 10*year;
  
  var population = function() {
    return inRange(patient.birthdate, earliest_birthdate, latest_birthdate);
  }
  
  var denominator = function() {
    var total_colectomy = lessThan(measure.total_colectomy_procedure_performed, effective_date);
    var encounter = inRange(measure.encounter_outpatient_encounter, earliest_encounter, effective_date);
    return encounter && !total_colectomy;
  }
  
  var numerator = function() {
    var colonoscopy = inRange(measure.colonoscopy_procedure_performed, ten_years, effective_date);
    var sigmoidoscopy = inRange(measure.flexible_sigmoidoscopy_procedure_performed, five_years, effective_date);
    var fobt = inRange(measure.fobt_laboratory_test_performed, one_year, effective_date);
    return colonoscopy || sigmoidoscopy || fobt;
  }
  
  var exclusion = function() {
    return ( lessThan(measure.colorectal_cancer_diagnosis_active, effective_date) +
             lessThan(measure.colorectal_cancer_diagnosis_inactive, effective_date) +
             lessThan(measure.colorectal_cancer_diagnosis_resolved, effective_date));
             
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};
