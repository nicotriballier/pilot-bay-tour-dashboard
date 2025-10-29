# Changelog

All notable changes to the Bay Area Aviation Weather Map will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-10-29

### 🚨 Major Safety Improvements

#### Enhanced Error Handling for Weather Data
- **NEW**: Clear error messages when aviationweather.gov is unreachable
- **IMPROVED**: Prominent red warning banner displays "WEATHER DATA UNAVAILABLE" 
- **SAFETY**: Prevents pilots from using the app when real weather data is not available
- **REMOVED**: All mock/fallback weather data - never shows fake weather information

#### Smart Image Validation for Visual Conditions
- **NEW**: EXIF metadata extraction from Lawrence Hall of Science camera image
- **NEW**: Automatic date validation - only displays images from the current day (Pacific Time)
- **NEW**: "No Current Picture Available" placeholder for outdated images
- **SAFETY**: Prevents misleading pilots with outdated visual conditions
- **TECHNICAL**: Custom EXIF parser handles JPEG DateTime fields with proper timezone handling

### 🌍 Expanded Airport Coverage
- **ADDED**: KTCY (Tracy Municipal Airport)
- **ADDED**: KSCK (Stockton Metropolitan Airport) 
- **ADDED**: KMOD (Modesto City-County Airport)
- **TOTAL**: Now covers 20 airports across Bay Area and Central Valley

### 🌬️ Improved Wind Display
- **IMPROVED**: Shows "No Wind" instead of "N/A" for calm conditions
- **IMPROVED**: Proper zero-padding for wind directions (005° vs 5°)
- **IMPROVED**: Better handling of variable wind conditions (VRB)

### 🕐 Better Timezone Handling
- **FIXED**: Dynamic timezone detection (PDT/PST) instead of hardcoded "PST"
- **IMPROVED**: All timestamps now show correct Pacific Time abbreviation

### 🏗️ Technical Improvements
- **ADDED**: Expandable version display in bottom-right corner
- **ADDED**: Build information with git hash, branch, and build date
- **ADDED**: Copy-to-clipboard functionality for version info
- **IMPROVED**: Better error logging and debugging information
- **IMPROVED**: Cleaner UI with reduced redundant warning messages

---

## [1.1.0] - 2025-10-28

### 🌍 Airport Expansion
- **ADDED**: 3 new airports (Tracy, Stockton, Modesto)
- **TOTAL**: Expanded from 17 to 20 airports

### 🔧 Bug Fixes
- **FIXED**: Removed hardcoded weather data for all airports
- **IMPROVED**: All airports now display real-time METAR data

---

## [1.0.0] - 2025-10-28

### 🎉 Initial Release
- **NEW**: Interactive map with 17 Bay Area airports
- **NEW**: Real-time METAR weather data from aviationweather.gov
- **NEW**: Sam's Chowder House camera feeds (North & South views)
- **NEW**: Treasure Island YouTube live stream
- **NEW**: Lawrence Hall of Science static camera view
- **NEW**: Auto-refresh every 2 minutes for weather data
- **NEW**: Auto-refresh every 30 seconds for camera feeds
- **NEW**: Visual indicators for non-VFR weather conditions
- **NEW**: Clickable airport markers with detailed weather information

### 🛩️ Aviation Features
- **DISPLAY**: Temperature, wind, visibility, and conditions for each airport
- **DISPLAY**: METAR observation timestamps in Pacific Time
- **DISPLAY**: Color-coded weather conditions (red for non-clear conditions)
- **COVERAGE**: Airports from Sacramento to Monterey, Pacific Coast to Central Valley

### 🗺️ Airports Included
**Major Airports**: KSFO, KOAK, KSJC, KSMF, KMRY  
**General Aviation**: KSQL, KPAO, KHWD, KHAF, KLVK, KCCR, KNUQ, KRHV  
**Regional**: KSUU, KSTS, KAPC, KWVI

---

## Version History Summary

- **v1.2.0**: Major safety improvements with error handling and image validation
- **v1.1.0**: Airport expansion (20 total airports)
- **v1.0.0**: Initial release with core aviation weather functionality

---

## Safety Notice

This application is designed to provide supplementary weather information for aviation purposes. Always consult official weather sources and follow proper flight planning procedures. Do not use this application as your primary source for flight planning or navigation decisions.
