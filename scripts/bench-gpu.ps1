param([string]$Label, [string]$Out)
$env:TEMP='F:\deepseek\vat-video\.tmp'
$env:TMP=$env:TEMP
Set-Location 'F:\deepseek\vat-video'
$renderArgs = @('remotion','render','src/index.ts','VatExplainer',$Out,'--frames=0-239','--scale=0.5','--gl=angle','--log=error')
$sw=[Diagnostics.Stopwatch]::StartNew()
$p = Start-Process -FilePath 'npx.cmd' -ArgumentList $renderArgs -PassThru -WindowStyle Hidden -RedirectStandardOutput ($Out + '.stdout.log') -RedirectStandardError ($Out + '.stderr.log')
$gpu = @{}
while (-not $p.HasExited) {
  Get-CimInstance Win32_PerfFormattedData_GPUPerformanceCounters_GPUEngine -ErrorAction SilentlyContinue | Where-Object { $_.UtilizationPercentage -gt 0 -and $_.Name -match 'engtype_3D' } | ForEach-Object {
    if ($_.Name -match '_luid_0x[0-9A-Fa-f]+_0x([0-9A-Fa-f]+)_phys_0_') {
      $l = $matches[1]
      if (-not $gpu.ContainsKey($l)) { $gpu[$l] = @() }
      $gpu[$l] += $_.UtilizationPercentage
    }
  }
  Start-Sleep -Milliseconds 1200
}
$sw.Stop()
Write-Output ('RESULT ' + $Label + ' elapsed=' + [math]::Round($sw.Elapsed.TotalSeconds,1) + 's exit=' + $p.ExitCode)
foreach ($k in $gpu.Keys) {
  $v = $gpu[$k]
  Write-Output ('  LUID ' + $k + ' samples=' + $v.Count + ' avg=' + [math]::Round((($v | Measure-Object -Average).Average),1) + ' max=' + ($v | Measure-Object -Maximum).Maximum)
}
