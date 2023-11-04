#!/bin/bash

# Define the directory names
csv_dir="csv"
xls_dir="xls"

# Create the directories if they don't exist
mkdir -p "$csv_dir"
mkdir -p "$xls_dir"

# Move all .csv files into the csv directory
find . -maxdepth 1 -iname "*.csv" -exec mv {} "$csv_dir/" \;

# Move all .xls files into the xls directory
find . -maxdepth 1 -iname "*.xls" -exec mv {} "$xls_dir/" \;

echo "Files have been sorted."