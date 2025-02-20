FROM  openjdk:23-oracle
VOLUME /tmp
COPY target/*.jar app.jar
EXPOSE 8887
ENTRYPOINT ["java","-jar","/app.jar"]