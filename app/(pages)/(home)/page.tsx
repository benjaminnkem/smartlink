import CreateAnAccount from "@/components/UI/Home/create-account";
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
            <h1 className="text-6xl font-extrabold">
              Smart<span className="text-cyan-300">link</span>
            </h1>
          </div>
        </div>
      </header>
      <main>
        <section className="h-screen bg-black">
          <CreateAnAccount />
        </section>
      </main>
    </>
  );
};

export default Page;
