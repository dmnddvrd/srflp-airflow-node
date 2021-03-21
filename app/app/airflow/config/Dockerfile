FROM python:3.7-slim
LABEL maintainer="MarcLamberti"

# Setting default values for variables but they will be overwritten by the command from the readme file
ARG USER_ID=22
ARG GROUP_ID=22

# Deleting user if exists, if this line causes errors comment it
RUN userdel -f www-data

# Arguments that can be set with docker build
ARG AIRFLOW_VERSION=1.10.12
ARG AIRFLOW_HOME=/usr/local/airflow

# Export the environment variable AIRFLOW_HOME where airflow will be installed
ENV AIRFLOW_HOME=${AIRFLOW_HOME}

# Install dependencies and tools
RUN apt-get update -yqq && \
    apt-get upgrade -yqq && \
    apt-get install -yqq --no-install-recommends \ 
    wget \
    libczmq-dev \
    curl \
    libssl-dev \
    git \
    inetutils-telnet \
    bind9utils freetds-dev \
    libkrb5-dev \
    libsasl2-dev \
    libffi-dev libpq-dev \
    freetds-bin build-essential \
    default-libmysqlclient-dev \
    apt-utils \
    rsync \
    zip \
    unzip \
    gcc \
    vim \
    locales \
    && apt-get clean

RUN  apt-get -yq update && \
     apt-get -yqq install ssh

COPY ./requirements-python3.7.txt /requirements-python3.7.txt

COPY ./requirements.txt /requirements.txt

# Upgrade pip 
# Create users
# Install apache airflow with subpackages
RUN pip install --upgrade pip && \
    groupadd -g ${GROUP_ID} airflow && \
    useradd -ms /bin/bash -d ${AIRFLOW_HOME} -u ${USER_ID} -g airflow airflow  && \
    pip install apache-airflow[crypto,celery,postgres,kubernetes,docker]==${AIRFLOW_VERSION} --constraint /requirements-python3.7.txt
    
# Copy the entrypoint.sh from host to container (at path AIRFLOW_HOME)
COPY ./entrypoint.sh ./entrypoint.sh

# Set the entrypoint.sh file to be executable
RUN chmod +x ./entrypoint.sh

# Set the owner of the files in AIRFLOW_HOME to the user airflow
RUN chown -R airflow: ${AIRFLOW_HOME}

# Set the username to use
USER airflow

# Set workdir (it's like a cd inside the container)
WORKDIR ${AIRFLOW_HOME}

# Create the dags folder which will contain the DAGs
RUN mkdir dags

# Expose ports (just to indicate that this container needs to map port)
EXPOSE 8080

# Execute the entrypoint.sh
CMD [ "/entrypoint.sh" ]
