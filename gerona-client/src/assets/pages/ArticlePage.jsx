import Button from "../components/Button";

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero Section */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
          Articles
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-[#3E2C23] sm:text-4xl">
          Explore Capybara Stories and Facts
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-[#5A4B3A] sm:text-base">
          Discover different topics about capybaras including their lifestyle,
          behavior, habitat, and why they became popular around the world.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="border-y-2 border-[#8B5E3C] bg-[#FFF8F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7C9A6D]">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-[#3E2C23]">
            Capybara Topics
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-[#FFEAD2]">
              <img
                src="src/assets/styles/capy-swim4.jpg"
                className="h-full w-full object-cover rounded-xl"
                alt="Capybara Swimming"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C9A6D]">
              Article 01
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#3E2C23]">
              Where Do Capybaras Live?
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#5A4B3A]">
              Learn about the natural habitats of capybaras and why they prefer
              living near rivers, lakes, and wetlands.
            </p>

            <Button className="mt-4 bg-[#7C9A6D] text-white">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-[#FFEAD2]">
              <img
                src="src/assets/styles/capy-hi.jpg"
                className="h-full w-full object-cover rounded-xl"
                alt="Friendly Capybara"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C9A6D]">
              Article 02
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#3E2C23]">
              Why Are Capybaras So Friendly?
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#5A4B3A]">
              Discover why capybaras are known as the friendliest animals and
              how they interact peacefully with other species.
            </p>

            <Button className="mt-4 bg-[#7C9A6D] text-white">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-[#FFEAD2]">
              <img
                src="src/assets/styles/capy-water.jpg"
                className="h-full w-full object-cover rounded-xl"
                alt="Capybara in Water"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C9A6D]">
              Article 03
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#3E2C23]">
              Capybaras and Water
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#5A4B3A]">
              Water is crucial for their well-being, as it allows them to stay
              hydrated and avoid the heat of the day.
            </p>

            <Button className="mt-4 bg-[#7C9A6D] text-white">Read More</Button>
          </article>

          <article className="rounded-3xl border-2 border-[#D9C2A7] bg-[#FFF3E6] p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-[#FFEAD2]">
              <img
                src="src/assets/styles/capy-funny.jpg"
                className="h-full w-full object-cover rounded-xl"
                alt="Capybara with Duck"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7C9A6D]">
              Article 04
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#3E2C23]">
              Fun Facts About Capybaras
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#5A4B3A]">
              Read interesting and surprising facts about capybaras that make
              them unique and loved worldwide.
            </p>

            <Button className="mt-4 bg-[#7C9A6D] text-white">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;