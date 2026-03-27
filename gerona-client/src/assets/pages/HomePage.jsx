import Button from "../components/Button";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
              Capybara World
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-[#3E2C23] sm:text-4xl">
              Welcome to Capy Corner! 🐹
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#5A4B3A] sm:text-base">
              Capybaras are the largest rodents in the world and are known for
              their calm and friendly nature. This blog introduces their
              lifestyle, habitat, and why they are loved by many people.
            </p>

            <div className="mt-6">
              <Button
                to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-[#D9C2A7] bg-[#FFF3E6] p-6">
            <img
              src="src/assets/styles/capy1.jpg"
              alt="capybara"
              className="rounded-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Capybara Facts Section */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
            Capybara Facts
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#3E2C23]">
            Quick Overview
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-brown-900">8–10 years</p>
            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">Lifespan</p>
          </div>

          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-brown-900">5–20</p>
            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">Group Size</p>
          </div>

          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-brown-900">Excellent Swimmers</p>
            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">Ability</p>
          </div>

          <div className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-5">
            <p className="text-2xl font-bold text-brown-900">Webbed Feet</p>
            <p className="mt-2 text-[11px] uppercase text-[#7C9A6D]">Adaptation</p>
          </div>
        </div>
      </section>

      {/* Nature Wonders Section */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
            Nature Wonders
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#3E2C23]">
            Meet the Capybaras
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4">
            <img
              src="src/assets/styles/capy-swim2.jpg"
              className="rounded-xl w-full"
            />

            <h3 className="mt-4 text-lg font-semibold text-[#3E2C23]">
              Habitat & Lifestyle
            </h3>

            <p className="mt-3 text-sm text-[#5A4B3A]">
              Capybaras live near rivers and lakes and enjoy swimming.
            </p>

            <Button className="mt-4 bg-green-400 hover:bg-green-500 text-white">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4">
            <img
              src="src/assets/styles/capy-friendly4.jpg"
              className="rounded-xl w-full"
            />

            <h3 className="mt-4 text-lg font-semibold text-[#3E2C23]">
              Friendly Behavior
            </h3>

            <p className="mt-3 text-sm text-[#5A4B3A]">
              They are known for being calm and friendly with other animals.
            </p>

            <Button className="mt-4 bg-green-400 hover:bg-green-500 text-white">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4">
            <img
              src="src/assets/styles/capy-swim3.jpg"
              className="rounded-xl w-full"
            />

            <h3 className="mt-4 text-lg font-semibold text-[#3E2C23]">
              Fun Facts
            </h3>

            <p className="mt-3 text-sm text-[#5A4B3A]">
              Capybaras can stay underwater for several minutes.
            </p>

            <Button className="mt-4 bg-green-400 hover:bg-green-500 text-white">
              View More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;