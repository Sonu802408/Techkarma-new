
Write-Host "Starting Compression..."
python scripts/compress_all.py
Write-Host "Starting Upload..."
cd scripts
node bulk_upload.js
Write-Host "Updating URLs back to Cloudinary..."
node update_urls.js
Write-Host "All processes completed successfully!"

