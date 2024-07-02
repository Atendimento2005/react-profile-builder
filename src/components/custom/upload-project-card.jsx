"use client";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
export default function UploadProjectCard({ uid, setLinks }) {
  const supabase = createClient();
  const { inputFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [], "image/jpeg": [] },
    onDropAccepted: (files) => {
      const uploads = [];
      for (const i in files) {
        uploads.push(uploadProject(files[i]));
      }
      Promise.all(uploads)
        .then((data) => {
          console.log("Finished uploading!");

          setLinks((links) => [
            ...links,
            ...data?.map(
              (url) =>
                supabase.storage.from("projects").getPublicUrl(url).data
                  .publicUrl,
            ),
          ]);
        })
        .catch((err) => {
          console.log("Failed to upload!");
          console.log(err);
        });
    },
  });

  // const { data, error } = supabase.auth.getUser();

  const uploadProject = async (file) => {
    return new Promise(async (resolve, reject) => {
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      console.log("Uploading" + filePath);

      supabase.storage
        .from("projects")
        .upload(filePath, file)
        .then(() => {
          supabase
            .from("images")
            .insert({
              user_id: uid,
              path: filePath,
            })
            .then(() => {
              resolve(filePath);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
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
