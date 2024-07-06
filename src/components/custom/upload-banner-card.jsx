"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { createClient } from "@/utils/supabase/client";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { useState, useEffect } from "react";

export default function UploadBannerCard({
  className,
  selected,
  updateSelected,
}) {
  const [path, setPath] = useState(null);
  const supabase = createClient();
  useEffect(() => {
    fetchBanner();
  })
  const { inputFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [], "image/jpeg": [] },
    onDropAccepted: (files) => {
      const upload = uploadBanner(files[0]);
      upload
        .then((path) => {
          console.log("Finished uploading!");
          setPath(path);
          updateSelected(4);
        })
        .catch((err) => {
          console.log("Failed to upload!");
          console.log(err);
        });
    },
  });

  const uploadBanner = async (file) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return new Promise(async (resolve, reject) => {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      console.log("Uploading" + filePath);

      supabase.storage
        .from("banners")
        .upload(filePath, file)
        .then(() => {
          supabase
            .from("banners")
            .insert({
              user_id: user.id,
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

  const fetchBanner = async () => {
    const {
          data: { user },
        } = await supabase.auth.getUser();

    if (!user) return

    supabase
      .from("banners")
      .select("path")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data.length === 0) return
        setPath(data[0].path);
      });
  };

  const deleteBanner = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    supabase
      .from("banners")
      .delete()
      .match({ user_id: user?.id })
      .then(() => {
        supabase.storage
          .from("banners")
          .remove(path)
          .then(() => {
            setPath(null);
            if (selected === 4) updateSelected(1)
          })
      });
  }

  return path ? (
    <ContextMenu>
      <ContextMenuTrigger>
        <Image
          alt="banner-img"
          width={600}
          height={1500}
          src={supabase.storage.from("banners").getPublicUrl(path).data.publicUrl}
          className={
            "rounded-md object-cover aspect-[5/2] w-full" +
            ( selected === 4 ? " outline outline-red-500 outline-3" : "")
          }
          onClick={() => updateSelected(4)}
        ></Image>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => deleteBanner()}>Remove banner</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ) : (
    <Card
      {...getRootProps({
        className: cn("dropzone aspect-[5/2] container bg-muted outline-dashed outline-muted-foreground w-full p-0 rounded-md"),
      })}
    >
      <CardContent className="h-full w-full flex flex-col items-center justify-center p-0 ">
        <input {...getInputProps()} />
        <Upload
          bg-cover
          className="text-muted-foreground text-xs w-5 md:w-6 lg:w-10"
        />
        <h2 className="mt-2 text-muted-foreground text-sm md:text-md lg:text-lg">
          Upload custom banner
        </h2>
      </CardContent>
    </Card>
  );
}
