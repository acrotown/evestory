import { ReloadIcon, UploadIcon } from "@radix-ui/react-icons";
import { useDropzone } from "@uploadthing/react/hooks";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

export default function InputFile({
  onChange,
  value,
}: {
  onChange: (url: string) => void;
  value: string;
  endPoint: "imageUploader";
}) {
  const fileType = value?.split(".").pop();

  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      }),
    );
  }, []);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      // @ts-ignore
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: async (res) => {
        // @ts-ignore
        onChange(res?.[0]?.url);
        setFiles([]);
      },
      onUploadError: () => {
        setFiles([]);
        toast.error("Error occurred while uploading.");
      },
      onUploadBegin: () => {},
    },
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  if (value && fileType !== "pdf" && files.length === 0) {
    return (
      <div {...getRootProps()} className="select-none">
        <input {...getInputProps()} />
        <div
          className={cn(
            "group relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-input bg-background hover:cursor-pointer group-hover:static",
            { "cursor-not-allowed": isUploading },
          )}
        >
          {/* <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border border-input bg-background hover:cursor-pointer"> */}
          <Image
            fill
            src={value}
            style={{ objectFit: "contain" }}
            alt="Uploadthing"
            className={cn("rounded-full group-hover:opacity-0", {
              "cursor-not-allowed opacity-50": isUploading,
            })}
          />
          <UploadIcon
            className={cn("flex h-6 w-6 items-center justify-center", {
              "opacity-0": isUploading,
            })}
          />
        </div>
      </div>
    );
  }

  return (
    <div {...getRootProps()} className="select-none">
      <input
        {...getInputProps()}
        disabled={isUploading}
        className="hover:cursor-pointer"
      />
      {files.length > 0 ? (
        <div className="flex flex-col space-y-3">
          {files.map((file, index) => (
            <div key={index}>
              <div
                className={cn(
                  "group relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-input bg-background hover:cursor-pointer group-hover:static",
                  { "cursor-not-allowed": isUploading },
                )}
              >
                <Image
                  // @ts-ignore
                  src={file.preview}
                  fill
                  style={{ objectFit: "contain" }}
                  alt="Uploadthing"
                  className={cn("absolute rounded-full group-hover:opacity-0", {
                    "cursor-not-allowed opacity-50 group-hover:cursor-not-allowed group-hover:opacity-50":
                      isUploading,
                  })}
                  onLoad={(e) => {
                    // @ts-ignore
                    URL.revokeObjectURL(file.preview);
                  }}
                />
                <UploadIcon
                  className={cn("flex h-6 w-6 items-center justify-center", {
                    "opacity-0 group-hover:cursor-not-allowed": isUploading,
                  })}
                />
              </div>
            </div>
          ))}
          <div className="flex space-x-2">
            <Button
              className={cn({ "cursor-not-allowed": isUploading })}
              size="sm"
              disabled={isUploading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                startUpload(files);
              }}
            >
              {isUploading ? (
                <>
                  <ReloadIcon className="mr-2 animate-spin" />{" "}
                  <span>Uploading...</span>
                </>
              ) : (
                "Upload"
              )}
            </Button>
            {/* <Button
              size="sm"
              variant="secondary"
              className={cn({ "cursor-not-allowed": isUploading })}
              disabled={isUploading}
            >
              Preview
            </Button> */}
          </div>
        </div>
      ) : (
        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border border-input bg-background hover:cursor-pointer">
          <UploadIcon
            className={cn("flex h-6 w-6 items-center justify-center", {
              "opacity-0": isUploading,
            })}
          />
        </div>
      )}
    </div>
  );
}
