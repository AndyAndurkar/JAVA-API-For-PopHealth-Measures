function NQF_Retooled_Measure_0068(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0068"];
  if (measure==null)
    measure={};

  

  var day = 24 * 60 * 60;
  var year = 365 * day;
  var effective_date = effDate;
  var latest_birthdate =   effective_date - (18 * year); // patients who will reach the age of 18 during the “measurement period”

  var earliest_encounter = effective_date - (2 *  year);
  var latest_encounter =   effective_date - (1 *  year) - (61 * day);
  var earliest_procedure = effective_date - (2 *  year);
  var latest_procedure =   effective_date - (1 *  year) - (61 * day);

  // The percentage of patients 18 years of age and older who were discharged alive for acute myocardial infarction (AMI),
  // coronary artery bypass graft (CABG) or percutaneous transluminal coronary angioplasty (PTCA) from January 1–November 1
  // of the year prior to the measurement year, or who had a diagnosis of ischemic vascular disease (IVD) during the
  // measurement year and the year prior to the measurement year and who had documentation of use of aspirin or another
  // antithrombotic during the measurement year.
  var population = function() {
    return (patient.birthdate <= latest_birthdate);
  }

  var denominator = function() {
    return ivd_denominator(measure, effective_date, earliest_procedure, latest_procedure, earliest_encounter, latest_encounter);
  }

  var numerator = function() {
    meds = inRange(measure.oral_anti_platelet_therapy_medication_active,    earliest_encounter, effective_date) +
           inRange(measure.oral_anti_platelet_therapy_medication_order,     earliest_encounter, effective_date) +
           inRange(measure.oral_anti_platelet_therapy_medication_dispensed, earliest_encounter, effective_date);
    return meds;
  }

  var exclusion = function() {
    false;
  }

   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};
