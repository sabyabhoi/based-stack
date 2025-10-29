import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="bg-red-500 w-full">
          <div>foo</div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default App;
