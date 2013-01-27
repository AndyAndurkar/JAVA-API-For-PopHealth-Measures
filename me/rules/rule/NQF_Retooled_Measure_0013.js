function NQF_Retooled_Measure_0013(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0013"];
  if (measure==null){
    measure={};
  };

  

  var year = 365*24*60*60;
  var effective_date = effDate;
  var period_start = effective_date - year;
  var latest_birthdate = effective_date - 18*year;

  var encounters = normalize(measure.encounter_outpatient_encounter,
    measure.encounter_nursing_facility_encounter);
  
  var population = function() {
    var correct_age = patient.birthdate <= latest_birthdate;
    var hypertension = lessThan(measure.hypertension_diagnosis_active, effective_date); // hypertension diagnosis is not bounded in time
    var num_encounters = inRange(encounters, period_start, effective_date);
    return (correct_age && hypertension && (num_encounters>=2));
  };

  var denominator = function() {
    return true;
  };

  var numerator = function() {
    var systolic =  eventDuringEncounter(measure.systolic_blood_pressure_physical_exam_finding,  encounters, period_start, effective_date);
    var diastolic = eventDuringEncounter(measure.diastolic_blood_pressure_physical_exam_finding, encounters, period_start, effective_date);
    return (systolic && diastolic);
  };

  var exclusion = function() {
    return false;
  };

   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
}
