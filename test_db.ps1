$env:PGPASSWORD='MyNewPassword123'

# Test connection to PostgreSQL
Write-Host "Testing PostgreSQL connection..."
$testConn = psql -U postgres -h localhost -c "SELECT 'PostgreSQL connection successful' AS message;" 2>&1
Write-Host $testConn

# Create database if it doesn't exist
Write-Host "`nCreating database 'neondb_local' if it doesn't exist..."
$dbExists = psql -U postgres -h localhost -tAc "SELECT 1 FROM pg_database WHERE datname = 'neondb_local'" 2>&1

if ($dbExists -eq "1") {
    Write-Host "Database 'neondb_local' already exists."
} else {
    $createDb = psql -U postgres -h localhost -c "CREATE DATABASE neondb_local;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Successfully created database 'neondb_local'"
    } else {
        Write-Host "Error creating database: $createDb"
        exit 1
    }
}

# Test connection to the new database
Write-Host "`nTesting connection to 'neondb_local' database..."
$testDbConn = psql -U postgres -h localhost -d neondb_local -c "SELECT 'Connected to neondb_local database' AS message;" 2>&1
Write-Host $testDbConn
