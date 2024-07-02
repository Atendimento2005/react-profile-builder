import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import ProjectGallery from "@/components/custom/project-gallery";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser().catch((err) => {
    console.log(err);
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col space-y-4 items-center justify-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-red-500">Project Media</CardTitle>
            <CardDescription>
              Show us what you&apos;ve got! Upload a few images of your best
              projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
            <ProjectGallery uid={user.id}></ProjectGallery>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
