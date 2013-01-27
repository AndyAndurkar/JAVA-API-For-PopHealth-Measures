function NQF_Retooled_Measure_0036__a(inPatient, inMeasure,effDate,resultMap)  {
  var patient = eval('(' + inPatient + ')');
  var measure = patient.measures["0036"];
  if (measure==null)
    measure={};

  

  var day = 24*60*60;
  var year = 365*day;
  var effective_date = effDate;
  var earliest_birthdate = effective_date - 11*year;
  var latest_birthdate = effective_date - 5*year;
  var earliest_encounter = effective_date - 1*year;

  var population = function() {
    return inRange(patient.birthdate, earliest_birthdate, latest_birthdate);
  }
  
  var denominator = function() {
    var den = asthmaDenominator(measure, earliest_birthdate, effective_date);
    return den;
  }
  
  var numerator = function() {
    var num = asthmaNumerator(measure, earliest_birthdate, effective_date);
    return num;
  }
  
  var exclusion = function() {
    var exc = asthmaExclusion(measure);
    return exc;
  }
  
   var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
};
