import {
  generateComponents,
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import { OurFileRouter } from "@/app/api/uploadthing/core";

// export let { Uploader } = generateComponents<OurFileRouter>()

export let { useUploadThing } = generateReactHelpers<OurFileRouter>();
export let UploadButton = generateUploadButton<OurFileRouter>();
export let UploadDropzone = generateUploadDropzone<OurFileRouter>();
export let Uploader = generateUploader<OurFileRouter>();
