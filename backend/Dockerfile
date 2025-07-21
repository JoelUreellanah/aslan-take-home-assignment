# --- Stage 1: Build the JAR using Gradle and Java 21 ---
FROM gradle:8.5-jdk21 AS builder

WORKDIR /app

# Copy build files and Gradle wrapper
COPY build.gradle settings.gradle ./
COPY gradlew ./
COPY gradle ./gradle

# Download dependencies first to leverage cache
RUN ./gradlew dependencies

# Copy source code
COPY src ./src

# Build Spring Boot fat jar
RUN ./gradlew clean bootJar

# --- Stage 2: Lightweight runtime ---
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
