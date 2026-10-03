import os
import sys
from huggingface_hub import HfApi

# Load environment or prompt
HF_TOKEN = os.environ.get("HF_TOKEN")
HF_REPO_ID = os.environ.get("HF_REPO_ID")

if not HF_TOKEN or not HF_REPO_ID:
    print("Error: HF_TOKEN and HF_REPO_ID environment variables are required.")
    print("Usage: python upload_to_hf.py <HF_TOKEN> <HF_REPO_ID>")
    if len(sys.argv) >= 3:
        HF_TOKEN = sys.argv[1]
        HF_REPO_ID = sys.argv[2]
    else:
        sys.exit(1)

print(f"Connecting to Hugging Face with Repo: {HF_REPO_ID}...")

api = HfApi(token=HF_TOKEN)

# 1. Create dataset repo if it doesn't exist (Public dataset for free hosting & CDN)
try:
    api.create_repo(
        repo_id=HF_REPO_ID,
        repo_type="dataset",
        exist_ok=True,
        private=False
    )
    print(f"Dataset repository '{HF_REPO_ID}' is ready.")
except Exception as e:
    print(f"Notice during repo creation: {e}")

# 2. Upload folder
folder_to_upload = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend/public/pdfs"))
print(f"Uploading files from: {folder_to_upload}")

if not os.path.exists(folder_to_upload):
    print(f"Error: Directory not found: {folder_to_upload}")
    sys.exit(1)

try:
    print("Starting upload to Hugging Face. This automatically skips duplicates and uses high-speed parallel upload...")
    api.upload_folder(
        folder_path=folder_to_upload,
        path_in_repo="pdfs",
        repo_id=HF_REPO_ID,
        repo_type="dataset",
        commit_message="Sync educational PDFs for TechKarma",
    )
    print("\n--- All PDFs uploaded successfully to Hugging Face! ---")
    print(f"Access URL base: https://huggingface.co/datasets/{HF_REPO_ID}/resolve/main/pdfs/")
except Exception as e:
    print(f"Upload failed: {e}")
    sys.exit(1)
