function NQF_Retooled_Measure_0004__b(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0004"];
  if (measure==null)
    measure={};

  

  var day = 24*60*60;
  var year = 365*day;
  var effective_date = effDate;
  var latest_birthdate = effective_date - 12*year;
  var earliest_birthdate = effective_date - 17*year;
  
  var population = function() {
    return((patient.birthdate < latest_birthdate) && (patient.birthdate > earliest_birthdate)  && 
             alcoholDrugFirstEvent(measure, effective_date));   //This has a sideeffect....see aod_treatment.js
  };
  
  var denominator = function() {
    return(alcohol_drug_denominator(measure));  
  };
  
  var numerator = function() {
    // numerator1 && numerator2
    return(alcohol_drug_numerator1(measure) && alcohol_drug_numerator2(measure));
  };
  
  var exclusion = function() {
    return false;
  };
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};
