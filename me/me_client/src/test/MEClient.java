package test;

import com.healthcare.me.FileFilterExtension;
import com.healthcare.me.MEPool;
import com.healthcare.me.ProcessProviderMeasures;
import com.healthcare.me.RulesUtil;

import java.io.File;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.logging.Logger;

public class MEClient {
    public MEClient() {
        super();
    }
    
    static Logger  logger = Logger.getLogger("MEClient");
  
    
    public static void main(String []args) throws Exception {
              
              if(args.length != 5) {
                  logger.severe("ProcessProvideFiles propertiesFile measurePeriod providerId InputPatientDirectory Batch/Online[1/2/3]");
                  return;
              }         
              
              String propertiesFile = args[0];
              String measuringPeriod = args[1];
              String providerId = args[2];
              String inputPatientDIrectory = args[3];
              String runStyle = args[4];
              ArrayList<String> patientList = new ArrayList<String>();   
              StringBuffer buf = new StringBuffer();
              ArrayList<HashMap> resultList;
              
              
              File file = new File(inputPatientDIrectory);
        
              // Read Patient Files are stored with ".txt" extension
              // Patient Data is needed for online invocation only
              // Load all Patient Files in memory
              String [] fileList = file.list(new FileFilterExtension("txt"));
              String patientJSON;     
              for(int ind=0;ind < fileList.length;ind++) {  
                  String inputFile = inputPatientDIrectory + "/" + fileList[ind];
                  patientJSON = new String(RulesUtil.readFile(inputFile));
                  patientList.add(patientJSON);
              }                           
              
              if(runStyle.equals("1")) {
                   // Process All the files based on ME configuration input directory
                   // Use Case Run ME as a batch engine
                  
                   logger.info("************************ Running Batch Client ******************************");

                   // Initialize & Create the ME Object
                   ProcessProviderMeasures processProvider_approach_1 = new ProcessProviderMeasures(propertiesFile);  
                   
                   // Process Measures. 
                   // Process Patient Data from the configuration variable "DATA_DIRECTORY"
                   processProvider_approach_1.processPatientFiles(measuringPeriod,providerId);
              }     
              else 
              if(runStyle.equals("2")) {
              
                  logger.info("***************************** Running ME API *******************************");              
                  // Run me directly
                  // Initialize & Create the ME Object
                  ProcessProviderMeasures processProvider_approach_2 = new ProcessProviderMeasures(propertiesFile);  
              
                  // Process all patients
                  resultList = processProvider_approach_2.processPatientRecords(measuringPeriod,providerId,patientList);

                  // Print Results
                  for(Iterator<HashMap> it = resultList.iterator();it.hasNext();) {
                        HashMap resultMap = it.next();
                  
                        buf.append(resultMap.get("PATIENT_ID")  + "," + resultMap.get("MEASURE_ID") + "," + resultMap.get("MEASURE_SUB_ID") + "," +  resultMap.get("POPULATION"));
                        buf.append("," + resultMap.get("DENOMINATOR") + "," + resultMap.get("EXCLUSION"));
                        buf.append("," + resultMap.get("ANTINUMARATOR") + "," + resultMap.get("NUMERATOR") + "\n" );
                        String success = (String)resultMap.get("SUCCESS");
                        if(!success.equals("TRUE"))
                            continue;                                                        
                   }
                  logger.info("Record Count :" + resultList.size());
                  logger.info(buf.toString());
                  
              }
              else {
              
                    logger.info("********************************  Running ME  Pool *********************************"); 
                  
                    // Run ME using ME pool
                    ProcessProviderMeasures processProvider_approach_3 ;  
              
                    // Initialize ME pool
                    // PoolName , ME Pool Count , ME COnfiguration File
                    MEPool mypool = new MEPool("HITECH" , 1 ,propertiesFile );
                  
                    // Get ME from the pool
                    processProvider_approach_3 = mypool.get();

                    // Execute ME
                    resultList = processProvider_approach_3.processPatientRecords(measuringPeriod,providerId,patientList);  
                  
                    // Print Results                  
                    logger.info("Record Count :" + resultList.size());      
                    for(Iterator<HashMap> it = resultList.iterator();it.hasNext();) {
                        HashMap resultMap = it.next();
                  
                        buf.append(resultMap.get("PATIENT_ID")  + "," + resultMap.get("MEASURE_ID") + "," + resultMap.get("MEASURE_SUB_ID") + "," +  resultMap.get("POPULATION"));
                        buf.append("," + resultMap.get("DENOMINATOR") + "," + resultMap.get("EXCLUSION"));
                        buf.append("," + resultMap.get("ANTINUMARATOR") + "," + resultMap.get("NUMERATOR") + "\n" );
                        String success = (String)resultMap.get("SUCCESS");
                        if(!success.equals("TRUE"))
                            continue;                                                        
                    }
                    logger.info("Record Count :" + resultList.size());
                    logger.info(buf.toString());
                  
                
                    // Release ME Pool Connection
                    mypool.release(processProvider_approach_3);
                                    
              }    
    }
}
