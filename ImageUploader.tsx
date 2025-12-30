import React, { useCallback, useRef } from 'react';

/**
 * Props for the ImageUploader component. Expects the current list of files and
 * a setter to update that list. The parent controls the actual state.
 */
export interface ImageUploaderProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

/**
 * ImageUploader provides a drag and drop area and a traditional file input for
 * uploading up to three images. Thumbnails are generated using object URLs.
 */
const ImageUploader: React.FC<ImageUploaderProps> = ({ files, setFiles }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle file selection from the file input. Accepts only image files and
   * limits the list to three items. Multiple calls replace the previous files.
   */
  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selected = event.target.files;
      if (!selected) return;
      const imageFiles = Array.from(selected).filter((file) => file.type.startsWith('image/'));
      setFiles(imageFiles.slice(0, 3));
      // Reset the input so selecting the same file again still triggers change
      event.target.value = '';
    },
    [setFiles],
  );

  /**
   * When files are dragged over the drop zone, prevent default to allow drop.
   */
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  /**
   * Handle drop events. Extract image files from the DataTransfer and update
   * state. Only up to three files will be kept.
   */
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const dt = event.dataTransfer;
      const droppedFiles: File[] = [];
      for (let i = 0; i < dt.files.length; i++) {
        const file = dt.files.item(i);
        if (file && file.type.startsWith('image/')) {
          droppedFiles.push(file);
        }
      }
      if (!droppedFiles.length) return;
      setFiles(droppedFiles.slice(0, 3));
    },
    [setFiles],
  );

  /**
   * Open the hidden file input programmatically when the drop zone is clicked.
   */
  const onAreaClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div className="uploader-container">
      <div
        className="upload-area"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={onAreaClick}
      >
        {files.length === 0 ? (
          <p className="upload-placeholder">Drag &amp; drop or click to upload up to 3 photos</p>
        ) : (
          <div className="preview-grid">
            {files.map((file, idx) => {
              const url = URL.createObjectURL(file);
              return (
                <div key={idx} className="preview-item">
                  <img src={url} alt={`Preview ${idx + 1}`} />
                </div>
              );
            })}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={onFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploader;