USE THIS SOFTWARE AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE.
This software is provided as is. I do not accept any liabilitiy in case of any software bug's / problems. Please use this software at your own risk. 
If you need any enhancement's / support please send an email andy_andurkar@yahoo.com.

To use Andy’s ME, You will have to say that “Your effort will use Andy’s Measures Engine component”.


How to Execute
    All the scripts are stored in the bin directory. 

Configuration File Details
    CONNECT_STRING= Database connect string
    DB_USER= Database User Name
    SECURITY_CREDENTIALS= Database Password
    ME_DIRECTORY= Location where ME rules are stored
    DATA_DIRECTORY=Location where Input & Output files are located
    DATABASE_INSERT= Database Yes / No indicator. If "Y" it will insert records in the database.
    INSERT_PATIENT=Insert Patient Info to Patient Table
    UseDataSource= Use Data Source instead of Connect String. This option is useful if you plan to run inside Application Server
    DataSourceName= Name Of the Data Source

    ARCHIVE_FILES= Do you want to archive input files, after the run
    CREATE_OUTPUT_FILE= Do you want to create output file

    PROCESS_SELECTED_MEASURES= Do you want to process a specific measure
    MEASURE_ID_LIST= List of Measure Id. "," is used as seperator
    PROCESS_SELECTED_PATIENTS=DO you want to Process a Specific patient
    PATIENT_ID_LIST=List of Patient Id's. Patient Id's are seperated by ","

    EFFECTIVE_DATE= Default Effective date for all the measures. 
    0001_EFFECTIVE_DATE=Specific Effective date for "0001" measure Id.
	

RunReport is giving error
    Please make sure JDBC connect_string / userid & Password is correct.	
	
How to create database schema
    Schema creation script is located in the root directory. Please use "create_measure_db.sql" file to create database schema. 
	
Is there any Sample code available
    Sample program is located in me_client directory.	
	
