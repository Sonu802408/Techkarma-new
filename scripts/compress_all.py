
import os
import pymupdf
import sys
import glob

pdf_dir = os.path.abspath('frontend/public/pdfs')
files = glob.glob(os.path.join(pdf_dir, '*.pdf'))

print(f'Found {len(files)} PDFs in total.')

for filepath in files:
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    if size_mb > 9.5:
        print(f'Compressing {os.path.basename(filepath)} ({size_mb:.2f} MB)...')
        try:
            doc = pymupdf.open(filepath)
            new_doc = pymupdf.open()
            for i in range(len(doc)):
                page = doc[i]
                pix = page.get_pixmap(dpi=100)
                img_data = pix.tobytes('jpeg', 60)
                new_page = new_doc.new_page(width=page.rect.width, height=page.rect.height)
                new_page.insert_image(page.rect, stream=img_data)
            
            temp_path = filepath + '.tmp'
            new_doc.save(temp_path)
            new_doc.close()
            doc.close()
            
            # Replace original
            os.remove(filepath)
            os.rename(temp_path, filepath)
            new_size = os.path.getsize(filepath) / (1024 * 1024)
            print(f'Done! New size: {new_size:.2f} MB')
        except Exception as e:
            print(f'Failed to compress {os.path.basename(filepath)}: {e}')

