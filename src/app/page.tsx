import {Chat} from "@/components/chat";
import { DarkModeToggle } from "@/components/theme/dark-mode-toggle";
export default function Home() {
  return (
    <main className="relative container flex min-h-screen flex-col">
      <div className=" p-4 flex h-14 items-center justify-between supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <span className="font-bold">pdf-chat-ai-sdk</span>
        <DarkModeToggle />
      </div>
      <div className="flex flex-1 py-4">
        <div className="w-full">
          <Chat />
        </div>
      </div>
    </main>
  );
}
