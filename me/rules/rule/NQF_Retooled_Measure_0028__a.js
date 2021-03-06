function NQF_Retooled_Measure_0028__a(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0028"];
  if (measure==null)
    measure={};

  

  var year = 365 * 24 * 60 * 60;
  var twenty_four_months = 2*year;   // interval used in numerator
  var effective_date = effDate;
  var latest_birthdate =   effective_date - 18 * year;
  var earliest_encounter = effective_date - 1  * year;
  var latest_encounter =   effective_date;
  var preventive_encounters = normalize(measure.encounter_prev_med_services_18_and_older_encounter,
    measure.encounter_prev_med_other_services_encounter,
    measure.encounter_prev_med_individual_counseling_encounter,
    measure.encounter_prev_med_group_counseling_encounter);
  var other_encounters = normalize(measure.encounter_health_and_behavior_assessment_encounter,
    measure.encounter_occupational_therapy_encounter,
    measure.encounter_office_visit_encounter,
    measure.encounter_psychiatric_psychologic_encounter);
  var all_encounters = normalize(preventive_encounters, other_encounters);
  var all_encounters_in_measurement_period = selectWithinRange(all_encounters, earliest_encounter, latest_encounter);

  var population = function() {
    return (patient.birthdate <= latest_birthdate && ((other_encounters.length >= 2) || (preventive_encounters.length >= 1)));
  }

  var denominator = function() {
    return true;
  }

  var numerator = function() {
    /*
     o �Patient characteristic: tobacco non-user� using the �tobacco non-user code list� within and including 24 months before or simultaneously to �Encounter: encounter psychiatric & psychologic� ......
     o �Patient characteristic: tobacco user� using the �tobacco user code list� within and including 24 months before or simultaneously to �Encounter: encounter psychiatric & psychologic� ....
    */
    // Let's look for an encounter within the measurement period that follows within 24 months of tobacco use/non-use
    var tobacco_user = actionFollowingSomething(measure.tobacco_user_patient_characteristic, all_encounters_in_measurement_period, twenty_four_months);
    var tobacco_non_user = actionFollowingSomething(measure.tobacco_non_user_patient_characteristic, all_encounters_in_measurement_period, twenty_four_months);
    return (tobacco_user || tobacco_non_user);
  }
  
  var exclusion = function() {
    return false;
  }

   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};
