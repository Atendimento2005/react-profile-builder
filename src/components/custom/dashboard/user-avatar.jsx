"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import NextImage from "next/image";

export default function UserAvatar({ uid, url }) {
  const supabase = createClient();
  const [image, setImage] = useState({});
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          console.log(error);
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const { inputFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [], "image/jpeg": [] },
    onDropAccepted: (files) => {
      // Open the editor modal
      setOpen(true);
      // Update the image variable for the editor
      setImage({ file: files[0], url: URL.createObjectURL(files[0]) });
    },
  });

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });

  const getCroppedImage = (srcImg, pixelCrop) => {
    return new Promise((resolve, reject) => {
      try {
        createImage(srcImg).then((image) => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.height = image.height;
          canvas.width = image.width;

          ctx.drawImage(image, 0, 0);

          const croppedCanvas = document.createElement("canvas");
          const croppedCtx = croppedCanvas.getContext("2d");
          // croppedCanvas.height = pixelCrop.height;
          // croppedCanvas.width = pixelCrop.width;
          // Crop to 256x256 for profile pictures
          croppedCanvas.height = 256;
          croppedCanvas.width = 256;
          croppedCtx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            // pixelCrop.width,
            // pixelCrop.height,
            256,
            256,
          );

          croppedCanvas.toBlob((file) => {
            resolve(file);
          }, "image/jpeg");
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const uploadAvatar = async (file) => {
    const fileExt = file.name.split(".").pop();
    const filePath = `${uid}-${Math.random()}.${fileExt}`;

    try {
      const { error: err } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    } finally {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          id: uid,
          avatar_url: filePath,
        })
        .select()
        .then(setAvatarUrl(URL.createObjectURL(file)));
    }
  };

  const handleAvatarUpdate = () => {
    const out = getCroppedImage(image.url, croppedAreaPixels);
    out.then((blob) => {
      blob.name = "avatar.jpeg";
      blob.lastModified = new Date();
      const file = new File([blob], "avatar.jpeg", {
        type: blob.type,
      });
      uploadAvatar(file);
    });
    setOpen(false);
  };

  return (
    <>
      <div
        {...getRootProps({
          className:
            "dropzone rounded-full overflow-hidden aspect-square min-w-fit my-5 md:mx-5 lg:mx-10 outline outline-red-500 outline-3",
        })}
      >
        <input {...getInputProps()} />
        {avatarUrl ? (
          <div className="h-52 md:h-56 lg:h-64 aspect-square rounded-full">
            <NextImage
              width={208}
              height={208}
              src={avatarUrl}
              alt="avatar"
              className="w-full h-full object-contain rounded-full"
            ></NextImage>
          </div>
        ) : (
          <Skeleton className="h-52 md:h-56 lg:h-64 aspect-square rounded-full"></Skeleton>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-sm">
          <div className="relative h-80">
            <Cropper
              image={image.url}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="flex flex-row w-full justify-center gap-4">
            <DialogClose>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"}>Update Profile</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[22rem]">
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    Press confirm to apply changes
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row gap-4 md:justify-end justify-center">
                  <DialogClose asChild>
                    <Button variant="destructive">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={handleAvatarUpdate}>Confirm</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
