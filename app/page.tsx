import { APP_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold tracking-tight">{APP_NAME}</h1>
      <h3 className="mt-2">landing page</h3>
    </div>
  );
}
