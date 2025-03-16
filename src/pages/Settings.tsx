
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ColabConnector from "@/components/ColabConnector";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">Configure your application's connection settings</p>
          
          <Separator className="my-6" />
          
          <h2 className="text-2xl font-semibold mb-4">Backend Connection</h2>
          <ColabConnector />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
