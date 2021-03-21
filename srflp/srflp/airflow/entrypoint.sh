#!/usr/bin/env bash

# pip install -e custom library

# Initiliase the metastore
airflow initdb
# Run the scheduler in background
airflow scheduler &> /dev/null &
# Run the web server in foreground (for docker logs)
exec airflow webserver
