FROM sonarqube:lts-community
COPY . /src

ARG SONAR_SCANNER_HOME=/opt/sonar-scanner
ARG SONAR_SCANNER_VERSION=4.6.2.2472-linux
ENV SONAR_SCANNER_HOME=${SONAR_SCANNER_HOME}

RUN apk add --no-cache --virtual wget unzip; \
    apk add --no-cache 'nodejs>12' 'npm>7'; \
    wget -U "scannercli" -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip; \
    unzip sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip; \
    mv sonar-scanner-${SONAR_SCANNER_VERSION} ${SONAR_SCANNER_HOME};

CMD ["/opt/sonarqube/bin/run.sh"]

# alias sonar-scanner=${SONAR_SCANNER_HOME}/bin/sonar-scanner