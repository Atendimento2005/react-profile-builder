"use client";
import { createClient } from "@/utils/supabase/client";
import UploadProjectCard from "./upload-project-card";
import ProjectImage from "./project-image";
import { useState, useEffect } from "react";
import { Suspense } from "react";
export default function ProjectGallery({ uid }) {
  const supabase = createClient();
  const [links, setLinks] = useState([]);
  useEffect(() => {
    supabase
      .from("images")
      .select("path")
      .eq("user_id", uid)
      .then(({ data }) => {
        const projectLinks = data.map(
          (elem) =>
            supabase.storage.from("projects").getPublicUrl(elem.path).data
              .publicUrl,
        );
        console.log("initialized links");
        setLinks(projectLinks);
      });
  }, [supabase, uid]);

  const deleteImage = (path) => {
    supabase.storage
      .from("projects")
      .remove([path])
      .then((data) => {
        supabase
          .from("images")
          .delete()
          .eq("path", path)
          .then((data) => {
            setLinks(links.filter((link) => !link.endsWith(path)));
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const images = links.map((link) => (
    <Suspense key={link} fallback="manka">
      <ProjectImage
        key={link}
        src={link}
        deleteImage={deleteImage}
      ></ProjectImage>
    </Suspense>
  ));

  return (
    <>
      {images}
      <UploadProjectCard uid={uid} setLinks={setLinks}></UploadProjectCard>
    </>
  );
}
