function NQF_Retooled_Measure_0036__c(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0036"];
  if (measure==null)
    measure={};

  

  var day = 24*60*60;
  var year = 365*day;
  var effective_date = effDate;
  var earliest_birthdate = effective_date - 50*year;
  var latest_birthdate = effective_date - 5*year;
  var earliest_encounter = effective_date - 2*year; // <= 1 years before or simultaneously to the  “measurement period”; 

  var population = function() {
    return inRange(patient.birthdate, earliest_birthdate, latest_birthdate);
  }
  
  var denominator = function() {
    return asthmaDenominator(measure, earliest_birthdate, effective_date);
  }
  
  var numerator = function() {
    return asthmaNumerator(measure, earliest_birthdate, effective_date);
  }
  
  var exclusion = function() {
    return asthmaExclusion(measure);
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};
