"use client";
import { createClient } from "@/utils/supabase/client";
import UploadCertificateCard from "./upload-certificate-card";
import ProjectImage from "./project-image";
import { useState, useEffect } from "react";
import { Suspense } from "react";
export default function CertificateGallery({ uid }) {
  const supabase = createClient();
  const [links, setLinks] = useState([]);
  useEffect(() => {
    supabase
      .from("certificates")
      .select("path")
      .eq("user_id", uid)
      .then(({ data }) => {
        const projectLinks = data.map(
          (elem) =>
            supabase.storage.from("certificates").getPublicUrl(elem.path).data
              .publicUrl,
        );
        console.log("initialized links");
        setLinks(projectLinks);
      });
  }, [supabase, uid]);

  const deleteImage = (path) => {
    supabase.storage
      .from("certificates")
      .remove([path])
      .then((data) => {
        supabase
          .from("certificates")
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
      <UploadCertificateCard
        uid={uid}
        setLinks={setLinks}
      ></UploadCertificateCard>
    </>
  );
}
