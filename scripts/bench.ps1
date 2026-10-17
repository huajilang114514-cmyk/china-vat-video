$env:TEMP='F:\deepseek\vat-video\.tmp'
$env:TMP=$env:TEMP
Set-Location 'F:\deepseek\vat-video'
$cases = @(
  @{ name='default'; extra=@() },
  @{ name='angle'; extra=@('--gl=angle') },
  @{ name='swiftshader'; extra=@('--gl=swiftshader') }
)
foreach ($c in $cases) {
  $out = 'out\bench-' + $c.name + '.mp4'
  $all = @('remotion','render','src/index.ts','VatExplainer',$out,'--frames=0-59','--scale=0.5','--log=error') + $c.extra
  $sw = [Diagnostics.Stopwatch]::StartNew()
  & npx @all *> $null
  $sw.Stop()
  Write-Output ($c.name + ' => ' + [math]::Round($sw.Elapsed.TotalSeconds,1) + 's')
}
