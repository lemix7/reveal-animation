import heartEmoji from "../assets/heart-emoji.png";

export default function Hero() {
  return (
    <section
      data-page="home"
      className="relative flex min-h-[max(36rem,100svh)] w-full items-center justify-center bg-page px-5 pb-10 text-ink md:pb-0"
    >
      <div className="text-center flex flex-col gap-4">
        {/* Heading */}
        <h1 className="font-hero text-[clamp(2rem,8vw,3.5rem)] leading-none font-black tracking-[-0.02em] md:text-[clamp(3rem,6vw,6rem)]">
          <span className="block whitespace-nowrap">
            Sud<i>a</i>nese He<i>a</i>rts
            <img
              src={heartEmoji}
              alt=""
              aria-hidden="true"
              className="ml-[0.15em] inline-block h-[0.85em] w-[0.85em] rotate-12 align-[-0.05em] object-contain"
            />
          </span>
          <span className="block whitespace-nowrap">
            Musl<i>i</i>m V<i>a</i>lues
          </span>
        </h1>

        <h2 className="text-lg capitalize">coming soon</h2>
      </div>
    </section>
  );
}
