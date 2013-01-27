JAVA-API-For-PopHealth-Measures
===============================

JAVA API For PopHealth Measures


Pophealth  is a great implementation, if you want to use as is. But If you  use traditional architecture  
(Java , SQL ) and would like to leverage “Pophealth” then Andy’s ME comes into picture.
I use Pophealth Measures. What I developed is a façade around Pophealth  Measures. 
I only need measures from PopHealth, I do not need anything else.
This ME can be easily integrated into any existing Java code or you will be able to create a service very easily.
I process & calculate patient Measure Results as I process patient records . 
Actual measures calculations happens in the end, which is a SQL query. Use the power of SQL to calculate measures. 
I have created service surrounding measures calculations. For this  measures calculation to work 
you will need to enable storing patient results to the database.
