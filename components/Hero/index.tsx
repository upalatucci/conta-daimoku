import Daimoku from "../Daimoku/Daimoku";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className=" relative z-10 overflow-hidden pb-8 pt-[120px] md:pb-[80px] md:pt-[100px] xl:pb-[100px] xl:pt-[180px] 2xl:pb-[120px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black  sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Conta Daimoku Campi Flegrei
                </h1>
                <Daimoku />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
