# Step 1: Get today's date as 22-July
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
 
# Step 5: Git commands
git add .
git commit -m "$commitMessage"
git push origin main