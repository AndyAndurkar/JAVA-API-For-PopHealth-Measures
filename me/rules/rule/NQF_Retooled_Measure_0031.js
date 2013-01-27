function NQF_Retooled_Measure_0031(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0031"];
  if (measure==null)
    measure={};

  

  var year = 365*24*60*60;
  var effective_date = effDate;
  var earliest_birthdate = effective_date - 68*year;
  var latest_birthdate = effective_date - 41*year;
  var earliest_encounter = effective_date - 2*year;

  var population = function() {
    return inRange(patient.birthdate, earliest_birthdate, latest_birthdate);
  }
  
  var denominator = function() {
    var outpatient_encounter = inRange(measure.encounter_outpatient_encounter, earliest_encounter, effective_date);
    // look for bilateral mastectomy or unilateral mastectomy
    unilateral = _.uniq(normalize(measure.unilateral_mastectomy_procedure_performed));
    bilateral = normalize(measure.bilateral_mastectomy_procedure_performed);
    modifier = normalize(measure.bilateral_mastectomy_modifier_procedure_performed);
    
    var no_breast = (
      (bilateral.length>0) ||
      (unilateral.length>0 && modifier.length>0) ||
      (unilateral.length > 1)  
    );
    return (outpatient_encounter && !no_breast);
  }
  
  var numerator = function() {
    return inRange(measure.breast_cancer_screening_diagnostic_study_performed, earliest_encounter, effective_date);
  }
  
  var exclusion = function() {
    return false;
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};