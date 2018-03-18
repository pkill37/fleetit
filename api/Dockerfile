FROM maven:3.5-jdk-9-slim as build
WORKDIR /app
COPY . /app
RUN mvn install

FROM openjdk:9-jre-slim
WORKDIR /app
COPY --from=build /app/target/ /app
CMD ["java", "-jar", "acme-1.0-SNAPSHOT-jar-with-dependencies.jar"]
