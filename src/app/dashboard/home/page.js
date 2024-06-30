import { createClient } from "@/utils/supabase/server";
import HomeForm from "@/components/custom/home-form";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser().catch((err) => {
    console.log(err);
  });

  const { data, error, status } = await supabase
    .from("profiles")
    .select("avatar_url, first_name, last_name")
    .eq("id", user?.id)
    .single();

  if (error) {
    console.log(error);
    console.log("status code", status);
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center pb-5">
        <h1 className="text-2xl font-bold md:text-3xl">
          Welcome, <span className="text-red-500">{data?.first_name}</span>
        </h1>
      </div>
      <HomeForm data={data} uid={user?.id}></HomeForm>
    </main>
  );
}
