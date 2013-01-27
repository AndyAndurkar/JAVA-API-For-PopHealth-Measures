function ObjectId(input) {

    return (input);
	
}

function emit(objectId,value) {

    return (objectId,value);
	
}

(function cf__1__f_() {
    var root = this;
    root.normalize = function () {if (arguments.length == 1 && _.isArray(arguments[0])) {return arguments[0];}return _.compact(_.flatten(arguments));};
    root.inRange = function (value, min, max) {value = normalize(value);var count = 0;for (i = 0; i < value.length; i++) {if (value[i] >= min && value[i] <= max) {count++;}}return count;};
    root.maxInRange = function (value, min, max) {value = normalize(value);var allInRange = _.select(value, function (v) {return v >= min && v <= max;});return _.max(allInRange);};
    root.lessThan = function (value, max) {value = normalize(value);var matching = _.select(value, function (v) {return v <= max;});return matching.length;};
    root.conditionResolved = function (conditions, startDate, endDate) {conditions = normalize(conditions);var resolvedWithinPeriod = function (condition) {return condition.end >= startDate && condition.end <= endDate;};return _.any(conditions, resolvedWithinPeriod);};
    root.minValueInDateRange = function (readings, startDate, endDate, defaultValue) {readings = normalize(readings);var readingInDateRange = function (reading) {return reading.date >= startDate && reading.date <= endDate;};var allInDateRange = _.select(readings, readingInDateRange);if (allInDateRange.length == 0) {return defaultValue;}var min = _.min(allInDateRange, function (reading) {return reading.value;});return min.value;};
    root.latestValueInDateRange = function (readings, startDate, endDate, defaultValue) {readings = normalize(readings);var readingInDateRange = function (reading) {return reading.date >= startDate && reading.date <= endDate;};var allInDateRange = _.select(readings, readingInDateRange);if (allInDateRange.length == 0) {return defaultValue;}var latest = _.max(allInDateRange, function (reading) {return reading.date;});return latest.value;};
    root.actionFollowingSomething = function (something, action, timePeriod) {something = normalize(something);action = normalize(action);if (timePeriod === undefined) {timePeriod = Infinity;}var result = 0;for (i = 0; i < something.length; i++) {var timeStamp = something[i];for (j = 0; j < action.length; j++) {if (action[j] >= timeStamp && action[j] <= timeStamp + timePeriod) {result++;}}}return result;};
    root.selectWithinRange = function (values, min, max) {values = normalize(values);return _.select(values, function (value) {return value <= max && value >= min;});};
    root.map = function (record, population, denominator, numerator, exclusion) {var value = {population:false, denominator:false, numerator:false, exclusions:false, antinumerator:false, patient_id:record.patient_id, first:record.first, last:record.last, gender:record.gender, birthdate:record.birthdate, test_id:record.test_id};if (population()) {value.population = true;if (denominator()) {value.denominator = true;if (numerator()) {value.numerator = true;} else if (exclusion()) {value.exclusions = true;value.denominator = false;} else {value.antinumerator = true;}}}
	emit(ObjectId(), value);
	return value;
	
	};
}).call(this); 

(function cf__2__f_(){
    var o = this, A = o._, r = typeof StopIteration !== "undefined" ? StopIteration : "__break__", k = Array.prototype, m = Object.prototype, i = k.slice, B = k.unshift, C = m.toString, p = m.hasOwnProperty, s = k.forEach, t = k.map, u = k.reduce, v = k.reduceRight, w = k.filter, x = k.every, y = k.some, n = k.indexOf, z = k.lastIndexOf;
    m = Array.isArray;
    var D = Object.keys, c = function (a) {return new l(a);};
    if (typeof exports !== "undefined") {
        exports._ = c;
    }
    o._ = c;
    c.VERSION = "1.1.2";
    var j = c.each = c.forEach = function (a, b, d) {try {if (s && a.forEach === s) {a.forEach(b, d);} else if (c.isNumber(a.length)) {for (var e = 0, f = a.length; e < f; e++) {b.call(d, a[e], e, a);}} else {for (e in a) {p.call(a, e) && b.call(d, a[e], e, a);}}} catch (g) {if (g != r) {throw g;}}return a;};
    c.map = function (a, b, d) {if (t && a.map === t) {return a.map(b, d);}var e = [];j(a, function (f, g, h) {e[e.length] = b.call(d, f, g, h);});return e;};
    c.reduce = c.foldl = c.inject = function (a, b, d, e) {var f = d !== void 0;if (u && a.reduce === u) {if (e) {b = c.bind(b, e);}return f ? a.reduce(b, d) : a.reduce(b);}j(a, function (g, h, E) {d = !f && h === 0 ? g : b.call(e, d, g, h, E);});return d;};
    c.reduceRight = c.foldr = function (a, b, d, e) {if (v && a.reduceRight === v) {if (e) {b = c.bind(b, e);}return d !== void 0 ? a.reduceRight(b, d) : a.reduceRight(b);}a = (c.isArray(a) ? a.slice() : c.toArray(a)).reverse();return c.reduce(a, b, d, e);};
    c.find = c.detect = function (a, b, d) {var e;j(a, function (f, g, h) {if (b.call(d, f, g, h)) {e = f;c.breakLoop();}});return e;};
    c.filter = c.select = function (a, b, d) {if (w && a.filter === w) {return a.filter(b, d);}var e = [];j(a, function (f, g, h) {if (b.call(d, f, g, h)) {e[e.length] = f;}});return e;};
    c.reject = function (a, b, d) {var e = [];j(a, function (f, g, h) {b.call(d, f, g, h) || (e[e.length] = f);});return e;};
    c.every = c.all = function (a, b, d) {b = b || c.identity;if (x && a.every === x) {return a.every(b, d);}var e = true;j(a, function (f, g, h) {(e = e && b.call(d, f, g, h)) || c.breakLoop();});return e;};
    c.some = c.any = function (a, b, d) {b = b || c.identity;if (y && a.some === y) {return a.some(b, d);}var e = false;j(a, function (f, g, h) {if (e = b.call(d, f, g, h)) {c.breakLoop();}});return e;};
    c.include = c.contains = function (a, b) {if (n && a.indexOf === n) {return a.indexOf(b) != -1;}var d = false;j(a, function (e) {if (d = e === b) {c.breakLoop();}});return d;};
    c.invoke = function (a, b) {var d = i.call(arguments, 2);return c.map(a, function (e) {return (b ? e[b] : e).apply(e, d);});};
    c.pluck = function (a, b) {return c.map(a, function (d) {return d[b];});};
    c.max = function (a, b, d) {if (!b && c.isArray(a)) {return Math.max.apply(Math, a);}var e = {computed:- Infinity};j(a, function (f, g, h) {g = b ? b.call(d, f, g, h) : f;g >= e.computed && (e = {value:f, computed:g});});return e.value;};
    c.min = function (a, b, d) {if (!b && c.isArray(a)) {return Math.min.apply(Math, a);}var e = {computed:Infinity};j(a, function (f, g, h) {g = b ? b.call(d, f, g, h) : f;g < e.computed && (e = {value:f, computed:g});});return e.value;};
    c.sortBy = function (a, b, d) {return c.pluck(c.map(a, function (e, f, g) {return {value:e, criteria:b.call(d, e, f, g)};}).sort(function (e, f) {var g = e.criteria, h = f.criteria;return g < h ? -1 : g > h ? 1 : 0;}), "value");};
    c.sortedIndex = function (a, b, d) {d = d || c.identity;for (var e = 0, f = a.length; e < f;) {var g = e + f >> 1;d(a[g]) < d(b) ? (e = g + 1) : (f = g);}return e;};
    c.toArray = function (a) {if (!a) {return [];}if (a.toArray) {return a.toArray();}if (c.isArray(a)) {return a;}if (c.isArguments(a)) {return i.call(a);}return c.values(a);};
    c.size = function (a) {return c.toArray(a).length;};
    c.first = c.head = function (a, b, d) {return b && !d ? i.call(a, 0, b) : a[0];};
    c.rest = c.tail = function (a, b, d) {return i.call(a, c.isUndefined(b) || d ? 1 : b);};
    c.last = function (a) {return a[a.length - 1];};
    c.compact = function (a) {return c.filter(a, function (b) {return !!b;});};
    c.flatten = function (a) {return c.reduce(a, function (b, d) {if (c.isArray(d)) {return b.concat(c.flatten(d));}b[b.length] = d;return b;}, []);};
    c.without = function (a) {var b = i.call(arguments, 1);return c.filter(a, function (d) {return !c.include(b, d);});};
    c.uniq = c.unique = function (a, b) {return c.reduce(a, function (d, e, f) {if (0 == f || (b === true ? c.last(d) != e : !c.include(d, e))) {d[d.length] = e;}return d;}, []);};
    c.intersect = function (a) {var b = i.call(arguments, 1);return c.filter(c.uniq(a), function (d) {return c.every(b, function (e) {return c.indexOf(e, d) >= 0;});});};
    c.zip = function () {for (var a = i.call(arguments), b = c.max(c.pluck(a, "length")), d = Array(b), e = 0; e < b; e++) {d[e] = c.pluck(a, "" + e);}return d;};
    c.indexOf = function (a, b) {if (n && a.indexOf === n) {return a.indexOf(b);}for (var d = 0, e = a.length; d < e; d++) {if (a[d] === b) {return d;}}return -1;};
    c.lastIndexOf = function (a, b) {if (z && a.lastIndexOf === z) {return a.lastIndexOf(b);}for (var d = a.length; d--;) {if (a[d] === b) {return d;}}return -1;};
    c.range = function (a, b, d) {var e = i.call(arguments), f = e.length <= 1;a = f ? 0 : e[0];b = f ? e[0] : e[1];d = e[2] || 1;e = Math.max(Math.ceil((b - a) / d), 0);f = 0;for (var g = Array(e); f < e;) {g[f++] = a;a += d;}return g;};
    c.bind = function (a, b) {var d = i.call(arguments, 2);return function () {return a.apply(b || {}, d.concat(i.call(arguments)));};};
    c.bindAll = function (a) {var b = i.call(arguments, 1);if (b.length == 0) {b = c.functions(a);}j(b, function (d) {a[d] = c.bind(a[d], a);});return a;};
    c.memoize = function (a, b) {var d = {};b = b || c.identity;return function () {var e = b.apply(this, arguments);return e in d ? d[e] : (d[e] = a.apply(this, arguments));};};
    c.delay = function (a, b) {var d = i.call(arguments, 2);return setTimeout(function () {return a.apply(a, d);}, b);};
    c.defer = function (a) {return c.delay.apply(c, [a, 1].concat(i.call(arguments, 1)));};
    c.wrap = function (a, b) {return function () {var d = [a].concat(i.call(arguments));return b.apply(b, d);};};
    c.compose = function () {var a = i.call(arguments);return function () {for (var b = i.call(arguments), d = a.length - 1; d >= 0; d--) {b = [a[d].apply(this, b)];}return b[0];};};
    c.keys = D ||
        function (a) {if (c.isArray(a)) {return c.range(0, a.length);}var b = [], d;for (d in a) {if (p.call(a, d)) {b[b.length] = d;}}return b;};
    c.values = function (a) {return c.map(a, c.identity);};
    c.functions = c.methods = function (a) {return c.filter(c.keys(a), function (b) {return c.isFunction(a[b]);}).sort();};
    c.extend = function (a) {j(i.call(arguments, 1), function (b) {for (var d in b) {a[d] = b[d];}});return a;};
    c.clone = function (a) {return c.isArray(a) ? a.slice() : c.extend({}, a);};
    c.tap = function (a, b) {b(a);return a;};
    c.isEqual = function (a, b) {if (a === b) {return true;}var d = typeof a;if (d != typeof b) {return false;}if (a == b) {return true;}if (!a && b || a && !b) {return false;}if (a.isEqual) {return a.isEqual(b);}if (c.isDate(a) && c.isDate(b)) {return a.getTime() === b.getTime();}if (c.isNaN(a) && c.isNaN(b)) {return false;}if (c.isRegExp(a) && c.isRegExp(b)) {return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;}if (d !== "object") {return false;}if (a.length && a.length !== b.length) {return false;}d = c.keys(a);var e = c.keys(b);if (d.length != e.length) {return false;}for (var f in a) {if (!(f in b) || !c.isEqual(a[f], b[f])) {return false;}}return true;};
    c.isEmpty = function (a) {if (c.isArray(a) || c.isString(a)) {return a.length === 0;}for (var b in a) {if (p.call(a, b)) {return false;}}return true;};
    c.isElement = function (a) {return !!(a && a.nodeType == 1);};
    c.isArray = m ||
        function (a) {return !!(a && a.concat && a.unshift && !a.callee);};
    c.isArguments = function (a) {return !!(a && a.callee);};
    c.isFunction = function (a) {return !!(a && a.constructor && a.call && a.apply);};
    c.isString = function (a) {return !!(a === "" || a && a.charCodeAt && a.substr);};
    c.isNumber = function (a) {return a === + a || C.call(a) === "[object Number]";};
    c.isBoolean = function (a) {return a === true || a === false;};
    c.isDate = function (a) {return !!(a && a.getTimezoneOffset && a.setUTCFullYear);};
    c.isRegExp = function (a) {return !!(a && a.test && a.exec && (a.ignoreCase || a.ignoreCase === false));};
    c.isNaN = function (a) {return c.isNumber(a) && isNaN(a);};
    c.isNull = function (a) {return a === null;};
    c.isUndefined = function (a) {return typeof a == "undefined";};
    c.noConflict = function () {o._ = A;return this;};
    c.identity = function (a) {return a;};
    c.times = function (a, b, d) {for (var e = 0; e < a; e++) {b.call(d, e);}};
    c.breakLoop = function () {throw r;};
    c.mixin = function (a) {j(c.functions(a), function (b) {F(b, c[b] = a[b]);});};
    var G = 0;
    c.uniqueId = function (a) {var b = G++;return a ? a + b : b;};
    c.templateSettings = {evaluate:/<%([\s\S]+?)%>/g, interpolate:/<%=([\s\S]+?)%>/g};
    c.template = function (a, b) {var d = c.templateSettings;d = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(d.interpolate, function (e, f) {return "'," + f.replace(/\\'/g, "'") + ",'";}).replace(d.evaluate || null, function (e, f) {return "');" + f.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('";}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');";d = new Function("obj", d);return b ? d(b) : d;};
    var l = function (a) {this._wrapped = a;};
    c.prototype = l.prototype;
    var q = function (a, b) {return b ? c(a).chain() : a;}, F = function (a, b) {l.prototype[a] = function () {var d = i.call(arguments);B.call(d, this._wrapped);return q(b.apply(c, d), this._chain);};};
    c.mixin(c);
    j(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (a) {var b = k[a];l.prototype[a] = function () {b.apply(this._wrapped, arguments);return q(this._wrapped, this._chain);};});
    j(["concat", "join", "slice"], function (a) {var b = k[a];l.prototype[a] = function () {return q(b.apply(this._wrapped, arguments), this._chain);};});
    l.prototype.chain = function () {this._chain = true;return this;};
    l.prototype.value = function () {return this._wrapped;};
}).call(this);  

(function cf__3__f_() {
    var root = this;
    var day = 86400;
    root.chlamydiaDenominator = function (measure, pregnancy_tests, earliest_encounter, effective_date) {var indicative_procedure = inRange(measure.procedures_indicative_of_sexually_active_woman_procedure_performed, earliest_encounter, effective_date);var indicative_labs = lessThan(measure.laboratory_tests_indicative_of_sexually_active_women_laboratory_test_performed, effective_date);var outpatient_encounter = lessThan(measure.encounter_outpatient_encounter, effective_date);var iud = lessThan(measure.iud_use_device_applied, earliest_encounter, effective_date);var education = lessThan(measure.contraceptive_use_education_communication_to_patient, effective_date);var contraceptives = lessThan(measure.contraceptives_medication_active, effective_date);var pregnancy_encounter = lessThan(measure.encounter_pregnancy_encounter, effective_date);var active = lessThan(measure.sexually_active_woman_diagnosis_active, effective_date);return outpatient_encounter && (indicative_procedure || pregnancy_tests.length > 0 || iud || education || contraceptives || pregnancy_encounter || indicative_labs || active);};
    root.chlamydiaExclusion = function (measure, pregnancy_tests, earliest_encounter, effective_date) {var pregnancyTestsInMeasureRange = selectWithinRange(pregnancy_tests, earliest_encounter, effective_date);var retinoid = actionFollowingSomething(pregnancyTestsInMeasureRange, measure.retinoid_medication_active, 7 * day) + actionFollowingSomething(pregnancyTestsInMeasureRange, measure.retinoid_medication_order, 7 * day) + actionFollowingSomething(pregnancyTestsInMeasureRange, measure.retinoid_medication_dispensed, 7 * day);var x_ray = actionFollowingSomething(pregnancyTestsInMeasureRange, measure.x_ray_study_diagnostic_study_performed, 7 * day);return retinoid || x_ray;};
}).call(this); 

(function cf__4__f_() {
    var root = this;
    var day = 86400;
    var year = 365 * day;
    var latest_birthdate;
    var earliest_birthdate;
    var earliest_encounter;
    var earliest_diagnosis;
    var latest_diagnosis;
    var diagnoses_during_period;
    var inpatient_encounters;
    var encounters;
    var diagnoses_during_encounters;
    var rehab_and_detox_during_inpatient_encounters;
    var first_alcohol_drug_event;
    var first_alcohol_drug_treatment_event;
    root.alcoholDrugFirstEvent = function (measure, effective_date) {earliest_encounter = effective_date - 1 * year;earliest_diagnosis = effective_date - 1 * year;latest_diagnosis = effective_date - 45 * day;diagnoses_during_period = selectWithinRange(measure.alcohol_or_drug_dependence_diagnosis_active, earliest_diagnosis, latest_diagnosis);inpatient_encounters = normalize(measure.encounter_acute_inpt_encounter, measure.encounter_non_acute_inpatient_encounter);encounters = normalize(inpatient_encounters, measure.encounter_ed_encounter, measure.encounter_outpatient_bh_encounter);diagnoses_during_encounters = allDiagnosesDuringEncounter(measure.alcohol_or_drug_dependence_diagnosis_active, encounters, earliest_diagnosis, latest_diagnosis);rehab_and_detox_during_inpatient_encounters = allEventsDuringEncounter(measure.alcohol_drug_rehab_and_detox_interventions_procedure_performed, inpatient_encounters, earliest_diagnosis, latest_diagnosis);var first_diagnosis_during_encounter = _.min(diagnoses_during_encounters);var first_rehab_and_detox_during_inpatient_encounter = _.min(rehab_and_detox_during_inpatient_encounters);first_alcohol_drug_event = Math.min(first_diagnosis_during_encounter, first_rehab_and_detox_during_inpatient_encounter);return first_alcohol_drug_event;};
    root.alcohol_drug_denominator = function (measure) {var begin_range = first_alcohol_drug_event - 60 * day;var previous_event = inRange(measure.alcohol_or_drug_dependence_diagnosis_active, begin_range, first_alcohol_drug_event - 1);return previous_event == 0;};
    root.alcohol_drug_numerator1 = function (measure) {var alcohol_drug_treatments = selectWithinRange(diagnoses_during_encounters, first_alcohol_drug_event + 1, first_alcohol_drug_event + 14 * day);if (alcohol_drug_treatments.length > 0) {first_alcohol_drug_treatment_event = _.min(alcohol_drug_treatments);}return alcohol_drug_treatments.length > 0;};
    root.alcohol_drug_numerator2 = function (measure) {var followup_treatments = inRange(diagnoses_during_encounters, first_alcohol_drug_treatment_event + 1, first_alcohol_drug_treatment_event + 30 * day);return followup_treatments >= 2;};
}).call(this); 

(function cf__5__f_() { var root = this; var year = 365*24*60*60; 
 root.weight_denominator = function(measure, period_start, effective_date) {   
 var encounter =   inRange(measure.encounter_outpatient_w_pcp_obgyn_encounter, period_start, effective_date);   
 var pregnant =            inRange(measure.pregnancy_diagnosis_active,  period_start, effective_date);    
 var pregnancy_encounter = inRange(measure.encounter_pregnancy_encounter,  period_start, effective_date);   
 return encounter && !(pregnant || pregnancy_encounter);  
 }  
 
 root.weight_population = function(patient, earliest_birthdate, latest_birthdate) {    return inRange(patient.birthdate, earliest_birthdate, latest_birthdate);  }
 
    var root = this;
    var year = 31536000;
    root.weight_denominator = function (measure, period_start, effective_date) {var encounter = inRange(measure.encounter_outpatient_w_pcp_obgyn_encounter, period_start, effective_date);var pregnant = inRange(measure.pregnancy_diagnosis_active, period_start, effective_date);var pregnancy_encounter = inRange(measure.encounter_pregnancy_encounter, period_start, effective_date);return encounter && !(pregnant || pregnancy_encounter);};
    root.weight_population = function (patient, earliest_birthdate, latest_birthdate) {return inRange(patient.birthdate, earliest_birthdate, latest_birthdate);};
    root.weight_numerator = function (measure, minBMI, maxBMI) {encounters = normalize(measure.encounter_outpatient_encounter);exam_findings = normalize(measure.bmi_physical_exam_finding);followup_plans = normalize(measure.follow_up_plan_bmi_management_care_plan);dietary_consult = normalize(measure.dietary_consultation_order_communication_provider_to_provider);for (var i = 0; i < encounters.length; i++) {var encounter_date = encounters[i];var earliest_bmi = encounter_date - year / 2;for (var j = 0; j < exam_findings.length; j++) {var bmi = exam_findings[j];if (inRange(bmi.date, earliest_bmi, encounter_date)) {if (bmi.value >= minBMI && bmi.value < maxBMI) {return true;} else if (dietary_consult.length > 0) {return true;} else if (followup_plans.length > 0) {return true;}}}}return false;};
    root.weight_exclusion = function (measure, earliest_encounter, effective_date) {var terminal_illness = actionFollowingSomething(measure.terminal_illness_patient_characteristic, measure.encounter_outpatient_encounter, year / 2);var pregnant = inRange(measure.pregnancy_diagnosis_active, earliest_encounter, effective_date);var not_done = inRange(measure.physical_exam_not_done_physical_exam_not_done, earliest_encounter, effective_date);return pregnant || not_done || terminal_illness;};
}).call(this);

(function cf__6__f_() {
    var day = 86400;
    var year = 365 * day;
    var root = this;
    root.has_outpatient_encounter_with_pcp_obgyn = function (measure, earliest_diagnosis, effective_date) {return inRange(measure.encounter_outpatient_w_pcp_obgyn_encounter, earliest_diagnosis, effective_date);};
    root.dtap_numerator = function (measure, birthdate, effective_date) {var earliest_vaccine = birthdate + 42 * day;var latest_vaccine = birthdate + 2 * year;var number_dtap_vaccine_administered = inRange(unique_dates(measure.dtap_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_dtap_vaccine_procedure = inRange(unique_dates(measure.dtap_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return number_dtap_vaccine_administered >= 4 || number_dtap_vaccine_procedure >= 4;};
    root.dtap_exclusion = function (measure, birthdate, effective_date) {many_exclusions = normalize(measure.dtap_vaccine_medication_allergy, measure.encephalopathy_diagnosis_active, measure.progressive_neurologic_disorder_diagnosis_active);return inRange(many_exclusions, birthdate, effective_date);};
    root.ipv_numerator = function (measure, birthdate, effective_date) {var earliest_vaccine = birthdate + 42 * day;var latest_vaccine = birthdate + 2 * year;var number_ipv_vaccine_administered = inRange(unique_dates(measure.ipv_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_ipv_vaccine_procedure = inRange(unique_dates(measure.ipv_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return number_ipv_vaccine_administered >= 3 || number_ipv_vaccine_procedure >= 3;};
    root.ipv_exclusion = function (measure, birthdate, effective_date) {var many_exclusions = normalize(measure.ipv_medication_allergy, measure.neomycin_medication_allergy, measure.streptomycin_medication_allergy, measure.polymyxin_medication_allergy);return inRange(many_exclusions, birthdate, effective_date);};
    root.mmr_numerator = function (measure, birthdate, effective_date) {var latest_vaccine = birthdate + 2 * year;var earliest_vaccine = birthdate;var number_mmr_vaccine_administered = inRange(unique_dates(measure.mmr_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_measles_vaccine_administered = inRange(unique_dates(measure.measles_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_mumps_vaccine_administered = inRange(unique_dates(measure.mumps_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_rubella_vaccine_administered = inRange(unique_dates(measure.rubella_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_mmr_vaccine_procedure = inRange(unique_dates(measure.mmr_vaccine_procedure_performed), earliest_vaccine, latest_vaccine);var number_measles_vaccine_procedure = inRange(unique_dates(measure.measles_vaccine_procedure_performed), earliest_vaccine, latest_vaccine);var number_mumps_vaccine_procedure = inRange(unique_dates(measure.mumps_vaccine_procedure_performed), earliest_vaccine, latest_vaccine);var number_rubella_vaccine_procedure = inRange(unique_dates(measure.rubella_vaccine_procedure_performed), earliest_vaccine, latest_vaccine);var mmr_criteria = number_mmr_vaccine_administered >= 1 || number_mmr_vaccine_procedure >= 1;var rubella_criteria = (number_rubella_vaccine_administered >= 1 || number_rubella_vaccine_procedure >= 1) || conditionResolved(measure.rubella_diagnosis_resolved, birthdate, effective_date);var measles_criteria = (number_measles_vaccine_administered >= 1 || number_measles_vaccine_procedure >= 1) || conditionResolved(measure.measles_diagnosis_resolved, birthdate, effective_date);var mumps_criteria = (number_mumps_vaccine_administered >= 1 || number_mumps_vaccine_procedure >= 1) || conditionResolved(measure.mumps_diagnosis_resolved, birthdate, effective_date);return mmr_criteria || rubella_criteria && measles_criteria && mumps_criteria;};
    root.mmr_exclusion = function (measure, birthdate, effective_date) {many_exclusions = normalize(measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_active, measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_inactive, measure.hiv_disease_diagnosis_active, measure.multiple_myeloma_diagnosis_active, measure.leukemia_diagnosis_active, measure.immunodeficiency_diagnosis_active, measure.measles_vaccine_medication_allergy, measure.mumps_vaccine_medication_allergy, measure.rubella_vaccine_medication_allergy);return inRange(many_exclusions, birthdate, effective_date);};
    root.hib_numerator = function (measure, birthdate, effective_date) {var earliest_vaccine = birthdate + 42 * day;var latest_vaccine = birthdate + 2 * year;var number_hib_vaccine_administered = inRange(unique_dates(measure.hib_medication_administered), earliest_vaccine, latest_vaccine);var number_hib_vaccine_procedure = inRange(unique_dates(measure.hib_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return number_hib_vaccine_administered >= 2 || number_hib_vaccine_procedure >= 2;};
    root.hib_exclusion = function (measure, birthdate, effective_date) {return inRange(measure.hib_medication_allergy, birthdate, effective_date);};
    root.hep_b_numerator = function (measure, birthdate, effective_date) {var earliest_vaccine = birthdate;var latest_vaccine = birthdate + 2 * year;var number_hep_b_vaccine_procedure = inRange(unique_dates(measure.hepatitis_b_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);var number_hep_b_vaccine_administered = inRange(unique_dates(measure.hepatitis_b_vaccine_medication_administered), earliest_vaccine, latest_vaccine);return number_hep_b_vaccine_administered >= 3 || number_hep_b_vaccine_procedure >= 3 || conditionResolved(measure.hepatitis_b_diagnosis_diagnosis_resolved, birthdate, effective_date);};
    root.hep_b_exclusion = function (measure, birthdate, effective_date) {return inRange(measure.hepatitis_b_vaccine_medication_allergy, birthdate, effective_date) || inRange(measure.baker_s_yeast_substance_substance_allergy, birthdate, effective_date) || inRange(measure.baker_s_yeast_medication_allergy, birthdate, effective_date);};
    root.vzv_numerator = function (measure, birthdate, effective_date) {var latest_vaccine = birthdate + 2 * year;var earliest_vaccine = birthdate;var number_vzv_vaccine_administered = inRange(unique_dates(measure.vzv_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_vzv_vaccine_procedure = inRange(unique_dates(measure.vzv_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return (number_vzv_vaccine_administered >= 1 || number_vzv_vaccine_procedure >= 1) || conditionResolved(measure.vzv_diagnosis_resolved, birthdate, effective_date);};
    root.vzv_exclusion = function (measure, birthdate, effective_date) {many_exclusions = normalize(measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_active, measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_inactive, measure.hiv_disease_diagnosis_active, measure.multiple_myeloma_diagnosis_active, measure.leukemia_diagnosis_active, measure.immunodeficiency_diagnosis_active, measure.vzv_vaccine_medication_allergy);return inRange(many_exclusions, birthdate, effective_date);};
    root.pcv_numerator = function (measure, birthdate, effective_date) {var latest_vaccine = birthdate + 2 * year;var earliest_vaccine = birthdate;var number_pcv_vaccine_administered = inRange(unique_dates(measure.pneumococcal_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_pcv_vaccine_procedure = inRange(unique_dates(measure.pneumococcal_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return number_pcv_vaccine_administered >= 4 || number_pcv_vaccine_procedure >= 4;};
    root.pcv_exclusion = function (measure, birthdate, effective_date) {return inRange(measure.pneumococcal_vaccine_medication_allergy, birthdate, effective_date);};
    root.hep_a_numerator = function (measure, birthdate, effective_date) {var latest_vaccine = birthdate + 2 * year;var earliest_vaccine = birthdate;var number_hep_a_vaccine_administered = inRange(unique_dates(measure.hepatitis_a_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);var number_hep_a_vaccine_procedure = inRange(unique_dates(measure.hepatitis_a_vaccine_medication_administered), earliest_vaccine, latest_vaccine);return number_hep_a_vaccine_administered >= 2 || number_hep_a_vaccine_procedure >= 2 || conditionResolved(measure.hepatitis_a_diagnosis_diagnosis_resolved, birthdate, effective_date);};
    root.hep_a_exclusion = function (measure, birthdate, effective_date) {return inRange(measure.hepatitis_a_vaccine_medication_allergy, birthdate, effective_date);};
    root.rv_numerator = function (measure, birthdate, effective_date) {var latest_vaccine = birthdate + 2 * year;var earliest_vaccine = birthdate;var number_rv_vaccine_administered = inRange(unique_dates(measure.rotavirus_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_rv_vaccine_procedure = inRange(unique_dates(measure.rotavirus_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return number_rv_vaccine_administered >= 2 || number_rv_vaccine_procedure >= 2;};
    root.rv_exclusion = function (measure, birthdate, effective_date) {return inRange(measure.rotavirus_vaccine_medication_allergy, birthdate, effective_date);};
    root.inf_numerator = function (measure, birthdate, effective_date) {var earliest_vaccine = birthdate + 180 * day;var latest_vaccine = birthdate + 2 * year;var number_inf_vaccine_administered = inRange(unique_dates(measure.influenza_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);var number_inf_vaccine_procedure = inRange(unique_dates(measure.influenza_vaccine_medication_administered), earliest_vaccine, latest_vaccine);return number_inf_vaccine_administered >= 2 || number_inf_vaccine_procedure >= 2;};
    root.inf_exclusion = function (measure, birthdate, effective_date) {many_exclusions = normalize(measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_active, measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_inactive, measure.hiv_disease_diagnosis_active, measure.multiple_myeloma_diagnosis_active, measure.leukemia_diagnosis_active, measure.influenza_vaccine_medication_allergy, measure.immunodeficiency_diagnosis_active);return inRange(many_exclusions, birthdate, effective_date);};
}).call(this);

(function cf__7__f_() {
    var root = this;
    root.asthmaNumerator = function (measure, earliest_encounter, effective_date) {var antiasmathic_med = inRange(measure.antiasthmatic_combinations_medication_active, earliest_encounter, effective_date) + inRange(measure.antiasthmatic_combinations_medication_order, earliest_encounter, effective_date) + inRange(measure.antiasthmatic_combinations_medication_dispensed, earliest_encounter, effective_date);var antibody_med = inRange(measure.antibody_inhibitor_medication_active, earliest_encounter, effective_date) + inRange(measure.antibody_inhibitor_medication_order, earliest_encounter, effective_date) + inRange(measure.antibody_inhibitor_medication_dispensed, earliest_encounter, effective_date);var corticosteroid_med = inRange(measure.inhaled_corticosteroids_medication_active, earliest_encounter, effective_date) + inRange(measure.inhaled_corticosteroids_medication_order, earliest_encounter, effective_date) + inRange(measure.inhaled_corticosteroids_medication_dispensed, earliest_encounter, effective_date);var steroid_med = inRange(measure.inhaled_steroid_combinations_medication_active, earliest_encounter, effective_date) + inRange(measure.inhaled_steroid_combinations_medication_order, earliest_encounter, effective_date) + inRange(measure.inhaled_steroid_combinations_medication_dispensed, earliest_encounter, effective_date);var mast_cell_med = inRange(measure.mast_cell_stabilizer_medication_active, earliest_encounter, effective_date) + inRange(measure.mast_cell_stabilizer_medication_order, earliest_encounter, effective_date) + inRange(measure.mast_cell_stabilizer_medication_dispensed, earliest_encounter, effective_date);var methylxanthine_med = inRange(measure.methylxanthines_medication_active, earliest_encounter, effective_date) + inRange(measure.methylxanthines_medication_order, earliest_encounter, effective_date) + inRange(measure.methylxanthines_medication_dispensed, earliest_encounter, effective_date);return antiasmathic_med + antibody_med + corticosteroid_med + steroid_med + mast_cell_med + methylxanthine_med;};
    root.asthmaDenominator = function (measure, earliest_encounter, effective_date) {var long_acting_beta_med = inRange(measure.long_acting_inhaled_beta_2_agonist_medication_active, earliest_encounter, effective_date) + inRange(measure.long_acting_inhaled_beta_2_agonist_medication_order, earliest_encounter, effective_date) + inRange(measure.long_acting_inhaled_beta_2_agonist_medication_dispensed, earliest_encounter, effective_date);var short_acting_beta_med = inRange(measure.short_acting_beta_2_agonist_medication_active, earliest_encounter, effective_date) + inRange(measure.short_acting_beta_2_agonist_medication_order, earliest_encounter, effective_date) + inRange(measure.short_acting_beta_2_agonist_medication_dispensed, earliest_encounter, effective_date);var leukotriene_med = inRange(measure.leukotriene_inhibitors_medication_active, earliest_encounter, effective_date) + inRange(measure.leukotriene_inhibitors_medication_order, earliest_encounter, effective_date) + inRange(measure.leukotriene_inhibitors_medication_dispensed, earliest_encounter, effective_date);var denom_meds = long_acting_beta_med + short_acting_beta_med + asthmaNumerator(measure, earliest_encounter, effective_date);var ed_encounter = inRange(measure.encounter_ed_encounter, earliest_encounter, effective_date);var asthma = inRange(measure.asthma_diagnosis_active, earliest_encounter, effective_date);var acute_inpt_encounter = inRange(measure.encounter_acute_inpt_encounter, earliest_encounter, effective_date);var outpt_encounter = inRange(measure.encounter_outpatient_encounter, earliest_encounter, effective_date);return ed_encounter && asthma || acute_inpt_encounter && asthma || outpt_encounter >= 4 && asthma && denom_meds + leukotriene_med >= 2 || denom_meds >= 4 || leukotriene_med >= 4 && asthma;};
    root.asthmaExclusion = function (measure) {var copd = normalize(measure.copd_diagnosis_active);var cystic = normalize(measure.cystic_fibrosis_diagnosis_active);var emphysema = normalize(measure.emphysema_diagnosis_active);var failure = normalize(measure.acute_respiratory_failure_diagnosis_active);return copd.length > 0 || cystic.length > 0 || emphysema.length > 0 || failure.length > 0;};
}).call(this); 

(function cf__8__f_() {
    var root = this;
    var between = function (value, start, end) {return value >= start && value <= end;};
    root.allSomethingsDuringEncounter = function (somethings, encounters, startTimeRange, endTimeRange) {var result = 0;var i, j;var day = 86400;if (startTimeRange === undefined) {startTimeRange = - Infinity;}if (endTimeRange === undefined) {endTimeRange = Infinity;}somethings = normalize(somethings);encounters = normalize(encounters);somethings_in_range = _.select(somethings, function (val) {return between(val, startTimeRange, endTimeRange);});encounters_in_range = _.select(encounters, function (val) {return between(val, startTimeRange, endTimeRange);});matching = _.select(somethings_in_range, function (something) {window_start = something - day;window_end = something + day;return _.any(encounters_in_range, function (enc) {return between(enc, window_start, window_end);});});return matching;};
    root.somethingDuringEncounter = function (somethings, encounters, startTimeRange, endTimeRange) {all = allSomethingsDuringEncounter(somethings, encounters, startTimeRange, endTimeRange);return all.length;};
    root.eventDuringEncounter = function (event, encounter, startTimeRange, endTimeRange) {return somethingDuringEncounter(event, encounter, startTimeRange, endTimeRange);};
    root.diagnosisDuringEncounter = function (diagnosis, encounter, startTimeRange, endTimeRange) {return somethingDuringEncounter(diagnosis, encounter, startTimeRange, endTimeRange);};
    root.allEventsDuringEncounter = function (event, encounter, startTimeRange, endTimeRange) {return allSomethingsDuringEncounter(event, encounter, startTimeRange, endTimeRange);};
    root.allDiagnosesDuringEncounter = function (diagnosis, encounter, startTimeRange, endTimeRange) {return allSomethingsDuringEncounter(diagnosis, encounter, startTimeRange, endTimeRange);};
    root.actionAfterReading = function (readings, action) {var readings = normalize(readings);var action = normalize(action);var reading_dates = _.pluck(readings, "date");return actionFollowingSomething(reading_dates, action);};
    root.unique_dates = function (times) {if (!_.isArray(times)) {return times;}var dates = _.map(times, function (time) {return parseInt((time / 86400).toFixed(0)) * 86400;});return _.uniq(dates);};
}).call(this);

(function cf__9__f_() {  var root = this;  root.ivd_denominator = function(measure, effective_date, earliest_procedure, latest_procedure, earliest_encounter, latest_encounter) {  
    var root = this;
    root.ivd_denominator = function (measure, effective_date, earliest_procedure, latest_procedure, earliest_encounter, latest_encounter) {ptca = inRange(measure.ptca_procedure_performed, earliest_procedure, latest_procedure);ami = inRange(measure.acute_myocardial_infarction_diagnosis_active, earliest_encounter, latest_encounter) && inRange(measure.encounter_acute_inpt_encounter, earliest_encounter, latest_encounter);cabg = inRange(measure.cabg_procedure_performed, earliest_procedure, latest_procedure) && inRange(measure.encounter_acute_inpt_encounter, earliest_encounter, latest_encounter);ivd = inRange(measure.ischemic_vascular_disease_diagnosis_active, earliest_procedure, latest_procedure) && inRange(measure.encounter_acute_inpt_and_outpt_encounter, earliest_encounter, effective_date);return ptca || cabg || ami || ivd;};
} 
}).call(this);

(function cf__10__f_() {
    var day = 86400;
    var year = 365 * day;
    var root = this;
    root.has_outpatient_encounter_with_pcp_obgyn = function (measure, earliest_diagnosis, effective_date) {return inRange(measure.encounter_outpatient_w_pcp_obgyn_encounter, earliest_diagnosis, effective_date);};
    root.dtap_numerator = function (measure, birthdate, effective_date) {var earliest_vaccine = birthdate + 42 * day;var latest_vaccine = birthdate + 2 * year;var number_dtap_vaccine_administered = inRange(unique_dates(measure.dtap_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_dtap_vaccine_procedure = inRange(unique_dates(measure.dtap_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return number_dtap_vaccine_administered >= 4 || number_dtap_vaccine_procedure >= 4;};
    root.dtap_exclusion = function (measure, birthdate, effective_date) {many_exclusions = normalize(measure.dtap_vaccine_medication_allergy, measure.encephalopathy_diagnosis_active, measure.progressive_neurologic_disorder_diagnosis_active);return inRange(many_exclusions, birthdate, effective_date);};
    root.ipv_numerator = function (measure, birthdate, effective_date) {var earliest_vaccine = birthdate + 42 * day;var latest_vaccine = birthdate + 2 * year;var number_ipv_vaccine_administered = inRange(unique_dates(measure.ipv_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_ipv_vaccine_procedure = inRange(unique_dates(measure.ipv_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return number_ipv_vaccine_administered >= 3 || number_ipv_vaccine_procedure >= 3;};
    root.ipv_exclusion = function (measure, birthdate, effective_date) {var many_exclusions = normalize(measure.ipv_medication_allergy, measure.neomycin_medication_allergy, measure.streptomycin_medication_allergy, measure.polymyxin_medication_allergy);return inRange(many_exclusions, birthdate, effective_date);};
    root.mmr_numerator = function (measure, birthdate, effective_date) {var latest_vaccine = birthdate + 2 * year;var earliest_vaccine = birthdate;var number_mmr_vaccine_administered = inRange(unique_dates(measure.mmr_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_measles_vaccine_administered = inRange(unique_dates(measure.measles_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_mumps_vaccine_administered = inRange(unique_dates(measure.mumps_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_rubella_vaccine_administered = inRange(unique_dates(measure.rubella_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_mmr_vaccine_procedure = inRange(unique_dates(measure.mmr_vaccine_procedure_performed), earliest_vaccine, latest_vaccine);var number_measles_vaccine_procedure = inRange(unique_dates(measure.measles_vaccine_procedure_performed), earliest_vaccine, latest_vaccine);var number_mumps_vaccine_procedure = inRange(unique_dates(measure.mumps_vaccine_procedure_performed), earliest_vaccine, latest_vaccine);var number_rubella_vaccine_procedure = inRange(unique_dates(measure.rubella_vaccine_procedure_performed), earliest_vaccine, latest_vaccine);var mmr_criteria = number_mmr_vaccine_administered >= 1 || number_mmr_vaccine_procedure >= 1;var rubella_criteria = (number_rubella_vaccine_administered >= 1 || number_rubella_vaccine_procedure >= 1) || conditionResolved(measure.rubella_diagnosis_resolved, birthdate, effective_date);var measles_criteria = (number_measles_vaccine_administered >= 1 || number_measles_vaccine_procedure >= 1) || conditionResolved(measure.measles_diagnosis_resolved, birthdate, effective_date);var mumps_criteria = (number_mumps_vaccine_administered >= 1 || number_mumps_vaccine_procedure >= 1) || conditionResolved(measure.mumps_diagnosis_resolved, birthdate, effective_date);return mmr_criteria || rubella_criteria && measles_criteria && mumps_criteria;};
    root.mmr_exclusion = function (measure, birthdate, effective_date) {many_exclusions = normalize(measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_active, measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_inactive, measure.hiv_disease_diagnosis_active, measure.multiple_myeloma_diagnosis_active, measure.leukemia_diagnosis_active, measure.immunodeficiency_diagnosis_active, measure.measles_vaccine_medication_allergy, measure.mumps_vaccine_medication_allergy, measure.rubella_vaccine_medication_allergy);return inRange(many_exclusions, birthdate, effective_date);};
    root.hib_numerator = function (measure, birthdate, effective_date) {var earliest_vaccine = birthdate + 42 * day;var latest_vaccine = birthdate + 2 * year;var number_hib_vaccine_administered = inRange(unique_dates(measure.hib_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_hib_vaccine_procedure = inRange(unique_dates(measure.hib_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return number_hib_vaccine_administered >= 2 || number_hib_vaccine_procedure >= 2;};
    root.hib_exclusion = function (measure, birthdate, effective_date) {return inRange(measure.hib_medication_allergy, birthdate, effective_date);};
    root.hep_b_numerator = function (measure, birthdate, effective_date) {var earliest_vaccine = birthdate;var latest_vaccine = birthdate + 2 * year;var number_hep_b_vaccine_procedure = inRange(unique_dates(measure.hepatitis_b_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);var number_hep_b_vaccine_administered = inRange(unique_dates(measure.hepatitis_b_vaccine_medication_administered), earliest_vaccine, latest_vaccine);return number_hep_b_vaccine_administered >= 3 || number_hep_b_vaccine_procedure >= 3 || conditionResolved(measure.hepatitis_b_diagnosis_diagnosis_resolved, birthdate, effective_date);};
    root.hep_b_exclusion = function (measure, birthdate, effective_date) {return inRange(measure.hepatitis_b_vaccine_medication_allergy, birthdate, effective_date) || inRange(measure.baker_s_yeast_substance_substance_allergy, birthdate, effective_date) || inRange(measure.baker_s_yeast_medication_allergy, birthdate, effective_date);};
    root.vzv_numerator = function (measure, birthdate, effective_date) {var latest_vaccine = birthdate + 2 * year;var earliest_vaccine = birthdate;var number_vzv_vaccine_administered = inRange(unique_dates(measure.vzv_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_vzv_vaccine_procedure = inRange(unique_dates(measure.vzv_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return (number_vzv_vaccine_administered >= 1 || number_vzv_vaccine_procedure >= 1) || conditionResolved(measure.vzv_diagnosis_resolved, birthdate, effective_date);};
    root.vzv_exclusion = function (measure, birthdate, effective_date) {many_exclusions = normalize(measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_active, measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_inactive, measure.hiv_disease_diagnosis_active, measure.multiple_myeloma_diagnosis_active, measure.leukemia_diagnosis_active, measure.immunodeficiency_diagnosis_active, measure.vzv_vaccine_medication_allergy);return inRange(many_exclusions, birthdate, effective_date);};
    root.pcv_numerator = function (measure, birthdate, effective_date) {var latest_vaccine = birthdate + 2 * year;var earliest_vaccine = birthdate;var number_pcv_vaccine_administered = inRange(unique_dates(measure.pneumococcal_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_pcv_vaccine_procedure = inRange(unique_dates(measure.pneumococcal_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return number_pcv_vaccine_administered >= 4 || number_pcv_vaccine_procedure >= 4;};
    root.pcv_exclusion = function (measure, birthdate, effective_date) {return inRange(measure.pneumococcal_vaccine_medication_allergy, birthdate, effective_date);};
    root.hep_a_numerator = function (measure, birthdate, effective_date) {var latest_vaccine = birthdate + 2 * year;var earliest_vaccine = birthdate;var number_hep_a_vaccine_administered = inRange(unique_dates(measure.hepatitis_a_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);var number_hep_a_vaccine_procedure = inRange(unique_dates(measure.hepatitis_a_vaccine_medication_administered), earliest_vaccine, latest_vaccine);return number_hep_a_vaccine_administered >= 2 || number_hep_a_vaccine_procedure >= 2 || conditionResolved(measure.hepatitis_a_diagnosis_diagnosis_resolved, birthdate, effective_date);};
    root.hep_a_exclusion = function (measure, birthdate, effective_date) {return inRange(measure.hepatitis_a_vaccine_medication_allergy, birthdate, effective_date);};
    root.rv_numerator = function (measure, birthdate, effective_date) {var latest_vaccine = birthdate + 2 * year;var earliest_vaccine = birthdate;var number_rv_vaccine_administered = inRange(unique_dates(measure.rotavirus_vaccine_medication_administered), earliest_vaccine, latest_vaccine);var number_rv_vaccine_procedure = inRange(unique_dates(measure.rotavirus_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);return number_rv_vaccine_administered >= 2 || number_rv_vaccine_procedure >= 2;};
    root.rv_exclusion = function (measure, birthdate, effective_date) {return inRange(measure.rotavirus_vaccine_medication_allergy, birthdate, effective_date);};
    root.inf_numerator = function (measure, birthdate, effective_date) {var earliest_vaccine = birthdate + 180 * day;var latest_vaccine = birthdate + 2 * year;var number_inf_vaccine_administered = inRange(unique_dates(measure.influenza_vaccination_procedure_performed), earliest_vaccine, latest_vaccine);var number_inf_vaccine_procedure = inRange(unique_dates(measure.influenza_vaccine_medication_administered), earliest_vaccine, latest_vaccine);return number_inf_vaccine_administered >= 2 || number_inf_vaccine_procedure >= 2;};
    root.inf_exclusion = function (measure, birthdate, effective_date) {many_exclusions = normalize(measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_active, measure.cancer_of_lymphoreticular_or_histiocytic_tissue_diagnosis_inactive, measure.hiv_disease_diagnosis_active, measure.multiple_myeloma_diagnosis_active, measure.leukemia_diagnosis_active, measure.influenza_vaccine_medication_allergy, measure.immunodeficiency_diagnosis_active);return inRange(many_exclusions, birthdate, effective_date);};
}).call(this); 

(function cf__11__f_() {  var root = this;  
root.has_medications_indicative_of_diabetes = function(measure, earliest_diagnosis, effective_date) {    
var dispensed = inRange(measure.medications_indicative_of_diabetes_medication_dispensed,     earliest_diagnosis, effective_date);    
var ordered = inRange(measure.medications_indicative_of_diabetes_medication_order,      earliest_diagnosis, effective_date);   
 var active = inRange(measure.medications_indicative_of_diabetes_medication_active,      earliest_diagnosis, effective_date);    
 return dispensed || ordered || active;  
 } 
 
 root.diabetes_population = function(patient, earliest_birthdate, latest_birthdate) {    return inRange(patient.birthdate, earliest_birthdate, latest_birthdate);  }  
 root.diabetes_denominator = function(measure, earliest_diagnosis, effective_date) {    
 var diagnosis_diabetes = inRange(measure.diabetes_diagnosis_active, earliest_diagnosis, effective_date);   
 var encounter_acute = inRange(measure.encounter_acute_inpatient_or_ed_encounter,       earliest_diagnosis, effective_date);   
    var root = this;
	
    root.has_medications_indicative_of_diabetes = function (measure, earliest_diagnosis, effective_date) {var dispensed = inRange(measure.medications_indicative_of_diabetes_medication_dispensed, earliest_diagnosis, effective_date);var ordered = inRange(measure.medications_indicative_of_diabetes_medication_order, earliest_diagnosis, effective_date);var active = inRange(measure.medications_indicative_of_diabetes_medication_active, earliest_diagnosis, effective_date);return dispensed || ordered || active;};
	
    root.diabetes_population = function (patient, earliest_birthdate, latest_birthdate) {return inRange(patient.birthdate, earliest_birthdate, latest_birthdate);};
	
    root.diabetes_denominator = function (measure, earliest_diagnosis, effective_date) {var diagnosis_diabetes = inRange(measure.diabetes_diagnosis_active, earliest_diagnosis, effective_date);var encounter_acute = inRange(measure.encounter_acute_inpatient_or_ed_encounter, earliest_diagnosis, effective_date);var encounter_other = inRange(unique_dates(measure.encounter_non_acute_inpatient_outpatient_or_ophthalmology_encounter), earliest_diagnosis, effective_date);return has_medications_indicative_of_diabetes(measure, earliest_diagnosis, effective_date) || diagnosis_diabetes && (encounter_acute || encounter_other >= 2);};
	
    root.diabetes_exclusions = function (measure, earliest_diagnosis, effective_date) {var diagnosis_diabetes = inRange(measure.diabetes_diagnosis_active, earliest_diagnosis, effective_date);var encounter_acute = inRange(measure.encounter_acute_inpatient_or_ed_encounter, earliest_diagnosis, effective_date);var encounter_other = inRange(measure.encounter_non_acute_inpatient_outpatient_or_ophthalmology_encounter, earliest_diagnosis, effective_date);var polycystic_ovaries = inRange(measure.polycystic_ovaries_diagnosis_active, earliest_diagnosis, effective_date);var diagnosis_gestational_diabetes = inRange(measure.gestational_diabetes_diagnosis_active, earliest_diagnosis, effective_date);var diagnosis_steroid_induced_diabetes = inRange(measure.steroid_induced_diabetes_diagnosis_active, earliest_diagnosis, effective_date);return polycystic_ovaries && !(diagnosis_diabetes && (encounter_acute || encounter_other)) || (diagnosis_gestational_diabetes || diagnosis_steroid_induced_diabetes) && has_medications_indicative_of_diabetes(measure, earliest_diagnosis, effective_date) && !(diagnosis_diabetes && (encounter_acute || encounter_other));};
}
}).call(this);

