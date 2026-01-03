import DotBackground from "@/components/DotBackground";

export default function Home() {
  return (
    <>
      <DotBackground />
      <main className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-9xl font-extrabold uppercase">Shader arts</h1>
        <ul>
          <li>
            <a className="cursor-pointer" href="/bubbles">
              Bubbles
            </a>
          </li>
        </ul>
      </main>
    </>
  );
}
