import { useEffect } from "react";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { useApi } from "./hooks/useApi";

function App() {
  const { helloMessage, session, isLoading, error, fetchHello, fetchSession } = useApi();

  useEffect(() => {
    fetchHello();
  }, [fetchHello]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-6">
        <SidebarTrigger />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Hono RPC Client Demo</h1>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-card">
              <h2 className="font-semibold mb-2">Hello from Server:</h2>
              <p>{isLoading ? "Loading..." : helloMessage || "No message"}</p>
              {error && <p className="text-red-500 text-sm">Error: {error}</p>}
            </div>

            <div className="p-4 border rounded-lg bg-card">
              <h2 className="font-semibold mb-2">Session Data:</h2>
              <pre className="text-sm bg-muted p-2 rounded overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>

            <div className="flex gap-2">
              <Button onClick={fetchHello} disabled={isLoading}>
                Fetch Hello
              </Button>
              <Button onClick={fetchSession} disabled={isLoading}>
                Fetch Session
              </Button>
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default App;
