package test;

import com.healthcare.me.MEReport;
import com.healthcare.me.MEReportDTO;

import java.util.ArrayList;
import java.util.Iterator;

public class RunMeasuresReport {
    public RunMeasuresReport() {
        super();
    }
    
    public static void main(String []args) throws Exception {
        
        MEReport meReport = new MEReport();
    
        if(args.length != 3) {
            System.out.println("MEReport propertiesFile measurePeriod providerId");
            return;
        }         
        
        String propertiesFile = args[0];
        String measuringPeriod = args[1];
        String providerId = args[2];      
        
        // If ProviderId == 0 ... Report runs for all Providers.
        ArrayList<MEReportDTO> reportDataList = meReport.runMEReport(propertiesFile,measuringPeriod,providerId);   
        
        // Print Result
        MEReportDTO reportDto;
        for(Iterator<MEReportDTO> it = reportDataList.iterator();it.hasNext();) {
            reportDto = it.next();
            System.out.println(reportDto.getMeasuringPeriod() + ":" +   
                               reportDto.getProviderId() + ":" +                
                               reportDto.getMeasureId() + ":" +
                               reportDto.getSubId() + ":" +
                               reportDto.getPopulation() + ":" +
                               reportDto.getDenominator() + ":" +
                               reportDto.getExclusions()  + ":" +
                               reportDto.getNumerator() + ":" +
                               reportDto.getAntinumerator() );            
        }
        
    }    
    
}
