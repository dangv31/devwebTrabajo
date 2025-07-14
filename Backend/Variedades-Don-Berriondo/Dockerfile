# --- Etapa 1: Construcción con Maven ---
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests


# --- Etapa 2: Imagen Final ---
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

COPY --from=build /app/target/Variedades-Don-Berriondo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]