import Link from "next/link";

const LandingPageComponent = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full">
        <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="cursor-pointer">
            <Link href={"/"} className="text-xl font-bold">
              Meet&apos;sChatBot
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Login
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Welcome to Meet
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your intelligent AI chatbot platform powered by Google&apos;s Gemini
            API, delivering human-like conversations with unprecedented
            accuracy.
          </p>
          <a href="/signup">
            <button className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 mr-4">
              Get Started
            </button>
          </a>
          <a href="/login">
            <button className="inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-foreground border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8">
              Login
            </button>
          </a>
        </section>
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Intelligent Conversations",
                description:
                  "Experience natural, context-aware discussions powered by Google&apos;s Gemini API",
                icon: "message-square",
              },
              {
                title: "Secure Authentication",
                description:
                  "Your conversations are protected with robust security measures",
                icon: "shield",
              },
              {
                title: "Conversation History",
                description:
                  "Access and review your past conversations anytime",
                icon: "history",
              },
              {
                title: "Real-time Interaction",
                description:
                  "Enjoy seamless, real-time chat experiences with instant responses",
                icon: "sparkles",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border text-card-foreground shadow bg-card p-6 text-center"
              >
                <svg
                  className={`lucide lucide-${feature.icon} h-12 w-12 text-primary mb-4`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <h3 className="font-semibold leading-none tracking-tight mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {["LinkedIn", "Twitter (X)", "Facebook", "Instagram"].map(
              (platform, index) => (
                <a
                  key={index}
                  target="_blank"
                  href={`https://${platform
                    .toLowerCase()
                    .replace(/ \(.*\)/, "")
                    .replace(" ", "")}.com`}
                >
                  <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-foreground border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 min-w-[200px]">
                    {platform}
                  </button>
                </a>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPageComponent;
