import Button from "../components/Button";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero Section */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          <div className="rounded-3xl border-2 border-dashed border-[#D9C2A7]  bg-[#FFF3E6] p-6">
              <img
                src="src/assets/styles/capy-group.jpg"
                className="rounded-xl w-full object-cover"
              />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
              About Capybaras
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-[#3E2C23] sm:text-4xl">
              Understanding the calm and friendly nature of capybaras
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#5A4B3A] sm:text-base">
              Capybaras are gentle and social animals that spend most of their
              time near water. They are known for their relaxed lifestyle and
              ability to coexist peacefully with other animals, making them one
              of the most unique creatures in the animal kingdom.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary" className="bg-[#7C9A6D] text-white">
                Back Home
              </Button>
              <Button to="/articles" className="bg-[#7C9A6D] text-white">
                Open Articles
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* Capybara Characteristics Section */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
            Capybara Characteristics
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#3E2C23]">
            Unique Traits
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-[#3E2C23]">Grooming Experts</p>
            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">
              Social Bonding
            </p>
          </div>

          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-[#3E2C23]">Curious Explorer</p>
            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">Behavior</p>
          </div>

          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-[#3E2C23]">Diet Specialist</p>
            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">Feeding</p>
          </div>

          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-[#3E2C23]">Predator Alert</p>
            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">Survival</p>
          </div>
        </div>
      </section>

      {/* More Details Section */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
              Details
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[#3E2C23]">
              More About Capybaras
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
                <h3 className="text-lg font-bold text-[#3E2C23]">Habitat</h3>
                <p className="mt-3 text-sm text-[#5A4B3A]">
                  Capybaras are found in grasslands and forests near water
                  sources such as rivers, lakes, and swamps.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
                <h3 className="text-lg font-bold text-[#3E2C23]">Social Life</h3>
                <p className="mt-3 text-sm text-[#5A4B3A]">
                  They live in groups and rely on cooperation for protection and
                  survival.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
                <h3 className="text-lg font-bold text-[#3E2C23]">Communication</h3>
                <p className="mt-3 text-sm text-[#5A4B3A]">
                  Capybaras use sounds like whistles, barks, and clicks to
                  communicate with each other.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
              Visual Grid
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-[#FFF3E6]">
                <img
                  src="src/assets/styles/capy2.jpg"
                  className="rounded-xl w-full object-cover"
                />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-[#FFF3E6]">
                <img
                  src="src/assets/styles/capy-bleh.jpg"
                  className="rounded-xl w-full object-cover"
                />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-[#FFF3E6]">
                <img
                  src="src/assets/styles/capy-bath.jpg"
                  className="rounded-xl w-full object-cover"
                />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-[#FFF3E6]">
                <img
                  src="src/assets/styles/capy-eat.jpg"
                  className="rounded-xl w-full object-cover"
                />
              </div>
            </div>

            <Button className="mt-5 bg-[#7C9A6D] text-white">
              View Section
            </Button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;