const { execSync } = require('child_process')
const fs = require('fs')

const SOURCE = 'public/videos/reel_source.mp4'
const OUTPUT = 'public/videos/reel.mp4'

try {
  execSync('ffmpeg -version', { stdio: 'ignore' })
} catch {
  console.error('FFmpeg not found. Install with: brew install ffmpeg')
  process.exit(1)
}

if (!fs.existsSync(SOURCE)) {
  console.log('Place your uncompressed reel at public/videos/reel_source.mp4')
  console.log('Then run: npm run video:optimize')
  process.exit(0)
}

const sourceMB = (fs.statSync(SOURCE).size / 1024 / 1024).toFixed(1)
console.log(`Source: ${sourceMB}MB — optimising for web...`)

execSync(
  `ffmpeg -y -i ${SOURCE} \
   -c:v libx264 -crf 24 -preset slow \
   -movflags +faststart \
   -vf scale=1920:1080 \
   -an \
   ${OUTPUT}`,
  { stdio: 'inherit' }
)

const outputMB = (fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(1)
console.log(`Done. ${sourceMB}MB → ${outputMB}MB saved to ${OUTPUT}`)
