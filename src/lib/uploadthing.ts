import { generateComponents } from "@uploadthing/react"
import { generateReactHelpers } from "@uploadthing/react/hooks"

import { OurFileRouter } from "@/app/api/uploadthing/core"

export let { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>()

export let { useUploadThing } = generateReactHelpers<OurFileRouter>()
