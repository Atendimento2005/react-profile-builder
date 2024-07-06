import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser().catch((err) => {
    console.log(err);
  });

  const { data, error, status } = await supabase
    .from("profiles")
    .select("avatar_url, first_name, last_name, user_data (*)")
    .eq("id", user?.id)
    .single();
  
  if (error) {
    console.log(error);
    console.log("status code", status);
  }

  let projectLinks = [];
  let testimonials = [];

  await supabase
      .from("projects")
      .select("path")
      .eq("user_id", user?.id)
      .then(({ data }) => {
        projectLinks = data.map(
          (elem) =>
            supabase.storage.from("projects").getPublicUrl(elem.path).data
              .publicUrl,
        );
      });

  await supabase
    .from("testimonials")
    .select()
    .eq("user_id", user?.id)
    .then(data => {
      testimonials = data.data
    })
    
  const avatar_url = supabase.storage.from("avatars").getPublicUrl(data?.avatar_url).data.publicUrl;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-primary text-primary-foreground py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{data?.first_name + " " + data?.last_name}</h1>
              <h2 className="text-2xl font-medium">Architect</h2>
              <p className="max-w-[600px] text-lg text-primary-foreground/80">
                Jane Doe is an award-winning architect with over 15 years of experience in designing innovative and
                sustainable buildings. Her portfolio showcases a range of projects, from residential homes to commercial
                spaces, all characterized by their thoughtful design and attention to detail.
              </p>
            </div>
              <Image
                src={avatar_url}
                alt="Jane Doe"
                width={600}
                height={600}
                className="mx-auto aspect-square rounded-xl object-cover"
              />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="space-y-6 md:space-y-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Portfolio</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {projectLinks.map((link, i) => (
                  <div className="group relative overflow-hidden rounded-xl" key={i}>
                    <Image
                      src={link}
                      width={300}
                      height={300}
                      alt={"Project " + (i+1)}
                      className="aspect-square w-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-4 transition-all duration-300 group-hover:bg-transparent">
                    <h3 className="text-lg font-medium text-white">{"Project " + (i+1)}</h3>
                  </div>
                </div>
                ))}
                
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="space-y-6 md:space-y-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Testimonials and Certifications
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((test, i) => (
                  <div className="rounded-md border bg-background p-6 shadow-sm" key={i}>
                  <blockquote className="space-y-2">
                    <p className="text-lg font-medium leading-relaxed">
                      {test.testimonial_content}
                    </p>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{test.testimonial_author}</p>
                        <p className="text-sm text-muted-foreground">CEO, Acme Inc.</p>
                      </div>
                    </div>
                  </blockquote>
                </div>
                ))}
                <div className="rounded-md border bg-background p-6 shadow-sm">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Certifications</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <img src="/placeholder.svg" width={48} height={48} alt="LEED" />
                        <span className="text-sm">LEED Accredited Professional</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <img src="/placeholder.svg" width={48} height={48} alt="Passive House" />
                        <span className="text-sm">Certified Passive House Designer</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <img src="/placeholder.svg" width={48} height={48} alt="AIA" />
                        <span className="text-sm">AIA Certified Architect</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="space-y-6 md:space-y-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Education and Work Experience
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-md border bg-background p-6 shadow-sm">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Education</h3>
                    <div className="grid gap-2">
                      <div>
                        <p className="text-sm font-medium">Bachelor of Architecture</p>
                        <p className="text-sm text-muted-foreground">University of California, Berkeley</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Master of Architecture</p>
                        <p className="text-sm text-muted-foreground">Harvard University</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border bg-background p-6 shadow-sm">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Work Experience</h3>
                    <div className="grid gap-2">
                      <div>
                        <p className="text-sm font-medium">Senior Architect</p>
                        <p className="text-sm text-muted-foreground">Acme Design, San Francisco, CA</p>
                        <p className="text-sm text-muted-foreground">2018 - Present</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Architect</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 md:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact</h2>
                <p className="max-w-[600px] text-lg text-muted-foreground">
                  Get in touch with Jane Doe for inquiries about her architectural services or to discuss a potential
                  project.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-5 w-5 text-muted-foreground" />
                    <span>jane@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                    <span>(123) 456-7890</span>
                  </div>
                </div>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input type="text" placeholder="Name" className="max-w-lg flex-1" />
                  <Input type="email" placeholder="Email" className="max-w-lg flex-1" />
                </div>
                <Textarea rows={5} placeholder="Message" className="max-w-lg w-full" />
                <Button type="submit">Send Message</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}