function NQF_Retooled_Measure_0041(inPatient, inMeasure,effDate,resultMap)  {
    var patient = eval('(' + inPatient + ')');
    var measure = patient.measures["0041"];

    if (measure == null) {
        measure = {};
    } 
    

    var effective_date = effDate;
    
    var period_end = new Date(effective_date*1000);
    var earliest_birthdate = new Date(period_end);
    earliest_birthdate.setFullYear(period_end.getFullYear()-50);
    earliest_birthdate = earliest_birthdate.getTime()/1000;
    var earliest_encounter = new Date(period_end);
    earliest_encounter.setFullYear(period_end.getFullYear()-1);
    earliest_encounter = earliest_encounter.getTime()/1000;
    
    var flu_season_start_year = period_end.getFullYear();
    if (period_end.getMonth()<8) // months are 0 indexed so 8==sept
      flu_season_start_year-=1; // roll back a year if effective date before start of flu season
    var start_flu_encounter = new Date(flu_season_start_year, 8, 1, 0, 0, 0, 0);
    var end_flu_encounter = new Date(flu_season_start_year+1, 1, 28, 0, 0, 0, 0);
    start_flu_encounter = start_flu_encounter.getTime()/1000;
    end_flu_encounter = end_flu_encounter.getTime()/1000;
    
    var population = function () {

        var num_outpatient_encounters = inRange(measure.encounter_outpatient_encounter, earliest_encounter, effective_date);
        var other_encounters = normalize(
          measure.encounter_prev_med_40_and_older_encounter, 
          measure.encounter_prev_med_individual_counseling_encounter, 
          measure.encounter_prev_med_other_services_encounter, 
          measure.encounter_nursing_facility_encounter, 
          measure.encounter_nursing_discharge_encounter);
        var num_other_encounters = inRange(other_encounters, earliest_encounter, effective_date);
        return (patient.birthdate <= earliest_birthdate && (num_outpatient_encounters > 1 || num_other_encounters > 0));

    };

    var denominator = function () {
        return (inRange(measure.encounter_influenza_encounter, start_flu_encounter, end_flu_encounter) > 0);
    };

    var numerator = function () {
        return (eventDuringEncounter(measure.influenza_vaccine_medication_administered, measure.encounter_influenza_encounter) || eventDuringEncounter(measure.influenza_vaccination_procedure_performed, measure.encounter_influenza_encounter));
    };

    var exclusion = function () {
        many_exclusions = normalize(
          measure.allergy_to_eggs_substance_allergy,
          measure.influenza_vaccine_medication_allergy,
          measure.influenza_vaccine_medication_adverse_event,
          measure.influenza_vaccine_medication_intolerance,
          measure.influenza_vaccine_contraindicated_medication_not_done,
          measure.influenza_vaccine_declined_medication_not_done,
          measure.patient_reason_medication_not_done,
          measure.medical_reason_medication_not_done,
          measure.system_reason_medication_not_done,
          measure.influenza_vaccination_procedure_adverse_event,
          measure.influenza_vaccination_procedure_intolerance);
        return (many_exclusions.length > 0);
    };

     var value = map(patient, population, denominator, numerator, exclusion); resultMap.put("POPULATION",value.population); resultMap.put("DENOMINATOR",value.denominator); resultMap.put("NUMERATOR",value.numerator); resultMap.put("EXCLUSION",value.exclusions);resultMap.put("ANTINUMARATOR",value.antinumerator);;
}
