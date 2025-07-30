# Step 1: Get today's date (e.g., "29-July")
$today = Get-Date -Format "dd-MMMM"

# Step 2: Get last version used in today's commits
$log = git log --grep="$today-Version_" --pretty=format:"%s"
$matches = $log | Select-String -Pattern "Version_(\d+)" | ForEach-Object {
    [int]($_.Matches.Groups[1].Value)
}

# Step 3: Determine next version number
if ($matches.Count -gt 0) {
    $version = ($matches | Measure-Object -Maximum).Maximum + 1
} else {
    $version = 1
}

# Step 4: Construct commit message
$commitMessage = "$today-Version_$version"

# Step 5: Cleanup corrupted or temp files that cause issues
$badFiles = @(
    "tore .",
    "tatus",
    "et --hard HEAD",
    "x.backup",
    "app/seller/dashboard/page.tsx.clean"
)

foreach ($file in $badFiles) {
    if (Test-Path $file) {
        Remove-Item -Force -Recurse -Path $file -ErrorAction SilentlyContinue
    }
}

# Step 6: Git commands
git add .
git commit -am "$commitMessage"
git push origin main
 