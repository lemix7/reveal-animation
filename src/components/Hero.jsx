export default function Hero() {
  return (
    <section data-page="home" className="relative flex min-h-[max(36rem,100svh)] w-full items-center justify-center bg-page px-5 pb-10 text-ink md:pb-0">
      <div className="text-center flex flex-col gap-4">


        {/* Heading */}
        <h1 className="font-hero text-[clamp(2.7rem,12.8vw,4.5rem)] leading-none font-black tracking-[-0.02em] md:text-[clamp(4.5rem,8.333vw,8.5rem)]">
          <span className="block whitespace-nowrap">C<i>r</i>oss p<i>a</i>ths,</span>
          <span className="block whitespace-nowrap">D<i>a</i>te lo<i>c</i>al</span>
        </h1>

        <h2 className="text-lg capitalize">
          coming soon
        </h2>

      </div>
    </section>
  );
}
