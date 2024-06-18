"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
export default function UploadProjectCard() {
  const { inputFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [], "image/jpeg": [] },
  });
  return (
    <Card
      {...getRootProps({
        className:
          "dropzone max-w-xs aspect-video container bg-muted outline-dashed outline-muted-foreground",
      })}
    >
      <CardContent className="h-full flex flex-col items-center justify-center">
        <input {...getInputProps()} />
        <Upload bg-cover className="text-muted-foreground text-xs" />
        <h2 className="mt-2 text-muted-foreground">Click here to upload</h2>
        <p className="text-xs text-muted-foreground">
          (You can also drag your file here)
        </p>
      </CardContent>
    </Card>
  );
}
