import Image from "next/image";

const Page = () => {
  return (
    <>
      <header className="min-h-screen relative overflow-hidden">
        <Image
          src={"/images/background/home.jpg"}
          width={1920}
          height={1020}
          alt="background"
          className="w-full h-full object-cover absolute"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold">Smartlink</h1>
          </div>
        </div>
      </header>
      <main>
        <section className="h-screen bg-black"></section>
      </main>
    </>
  );
};

export default Page;
