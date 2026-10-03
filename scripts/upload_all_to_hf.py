import os
import glob
import json
import time
from huggingface_hub import HfApi, CommitOperationAdd

HF_TOKEN = os.environ.get("HF_TOKEN") or (sys.argv[1] if len(sys.argv) > 1 else None)
HF_REPO_ID = os.environ.get("HF_REPO_ID") or "SonuTechKarma/techkarma-pdfs"

if not HF_TOKEN:
    print("Notice: HF_TOKEN not set in environment or arguments.")
    api = None
else:
    api = HfApi(token=HF_TOKEN)

pdfs_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend/public/pdfs"))
tracker_file = os.path.join(os.path.dirname(__file__), "hf_uploaded_tracker.json")

# Load existing tracker
uploaded = {}
if os.path.exists(tracker_file):
    try:
        with open(tracker_file, "r", encoding="utf-8") as f:
            uploaded = json.load(f)
    except Exception:
        uploaded = {}

def save_tracker():
    with open(tracker_file, "w", encoding="utf-8") as f:
        json.dump(uploaded, f, indent=2)

all_files = glob.glob(os.path.join(pdfs_dir, "*.pdf"))
print(f"Total PDFs in directory: {len(all_files)}")

# Filter pending files
pending_files = [f for f in all_files if os.path.basename(f) not in uploaded]
print(f"Pending uploads: {len(pending_files)}")

if not pending_files:
    print("All PDFs are already uploaded to Hugging Face!")
    exit(0)

BATCH_SIZE = 250 # 250 files per commit for maximum speed

total_batches = (len(pending_files) + BATCH_SIZE - 1) // BATCH_SIZE

for batch_idx in range(total_batches):
    batch = pending_files[batch_idx * BATCH_SIZE : (batch_idx + 1) * BATCH_SIZE]
    
    operations = [
        CommitOperationAdd(
            path_in_repo=f"pdfs/{os.path.basename(filepath)}",
            path_or_fileobj=filepath
        )
        for filepath in batch
    ]
    
    print(f"\n[Batch {batch_idx + 1}/{total_batches}] Uploading {len(operations)} files...")
    
    retries = 3
    success = False
    while retries > 0 and not success:
        try:
            commit_info = api.create_commit(
                repo_id=HF_REPO_ID,
                repo_type="dataset",
                operations=operations,
                commit_message=f"Upload batch {batch_idx + 1} ({len(operations)} PDFs)"
            )
            for filepath in batch:
                uploaded[os.path.basename(filepath)] = True
            save_tracker()
            print(f"Batch {batch_idx + 1} finished successfully! ({commit_info.commit_url})")
            success = True
        except Exception as e:
            retries -= 1
            print(f"Error in batch {batch_idx + 1}: {e}. Retries left: {retries}")
            time.sleep(3)

    if not success:
        print(f"Stopping at batch {batch_idx + 1} due to error. You can rerun anytime to resume.")
        break

print("\n--- Upload Process Completed! ---")
print(f"Total uploaded so far: {len(uploaded)} / {len(all_files)}")
