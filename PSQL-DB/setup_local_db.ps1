# PowerShell script to set up local PostgreSQL database from Neon dump
# This script helps you create a local database and import the dump

param(
    [string]$LocalDbName = "neondb_local",
    [string]$LocalUser = "postgres",
    [string]$DumpFile = "neondb_complete_dump.sql"
)

$psqlPath = "C:\Program Files\PostgreSQL\17\bin\psql.exe"
$createdbPath = "C:\Program Files\PostgreSQL\17\bin\createdb.exe"

Write-Host "Setting up local PostgreSQL database..."
Write-Host "Database name: $LocalDbName"
Write-Host "Dump file: $DumpFile"
Write-Host ""

# Check if dump file exists
if (-not (Test-Path $DumpFile)) {
    Write-Error "Dump file '$DumpFile' not found!"
    exit 1
}

Write-Host "Step 1: Creating local database '$LocalDbName'..."
Write-Host "Command: & '$createdbPath' -U $LocalUser $LocalDbName"
Write-Host "(You may be prompted for the PostgreSQL password)"
Write-Host ""

Write-Host "Step 2: Importing database dump..."
Write-Host "Command: & '$psqlPath' -U $LocalUser -d $LocalDbName -f $DumpFile"
Write-Host ""

Write-Host "Step 3: Setting up environment variables for local database..."
$localConnectionString = "postgresql://$LocalUser:YOUR_PASSWORD@localhost:5432/$LocalDbName"
Write-Host "Local connection string: $localConnectionString"
Write-Host ""

Write-Host "To run these commands manually:"
Write-Host "1. & '$createdbPath' -U $LocalUser $LocalDbName"
Write-Host "2. & '$psqlPath' -U $LocalUser -d $LocalDbName -f $DumpFile"
Write-Host ""

Write-Host "Would you like to run these commands now? (Make sure PostgreSQL is running locally)"
$choice = Read-Host "Enter 'y' to proceed, any other key to exit"

if ($choice -eq 'y' -or $choice -eq 'Y') {
    Write-Host ""
    Write-Host "Creating database..."
    try {
        & $createdbPath -U $LocalUser $LocalDbName
        Write-Host "Database created successfully!"
        
        Write-Host "Importing dump file..."
        & $psqlPath -U $LocalUser -d $LocalDbName -f $DumpFile
        Write-Host "Database import completed!"
        
        Write-Host ""
        Write-Host "Local database setup complete!"
        Write-Host "You can now connect to your local database at:"
        Write-Host "  Host: localhost"
        Write-Host "  Port: 5432"
        Write-Host "  Database: $LocalDbName"
        Write-Host "  User: $LocalUser"
    }
    catch {
        Write-Error "An error occurred: $_"
        Write-Host "Make sure PostgreSQL is running and you have the correct permissions."
    }
} else {
    Write-Host "Setup cancelled. You can run the commands manually when ready."
}

