import Image from "next/image";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuContent,
} from "@/components/ui/context-menu";

export default function ProjectImage({ src, deleteImage }) {
  return (
    <div className="aspect-video w-full relative rounded-md overflow-hidden">
      <ContextMenu>
        <ContextMenuTrigger>
          <Image
            src={src}
            fill={true}
            alt="project-image"
            className="aspect-video shadow-md object-cover"
          ></Image>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => deleteImage(src.split("/").pop())}>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
