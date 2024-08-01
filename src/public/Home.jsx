import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* <!-- NAVBAR --> */}
      <header>
        <nav class="absolute  w-full text-white">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
            <a
              href="https://flowbite.com/"
              class="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-8"
                alt="Flowbite Logo"
              />
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul class="font-medium flex flex-col p-4 md:p-0 mt-4rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                <li>
                  <a
                    href="#"
                    class="block py-2 px-3 text-white rounded md:bg-transparent md:p-0"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 px-3 text-white rounded md:bg-transparent md:p-0"
                    aria-current="page"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <Link
                    to="/auth"
                    class="block py-2 px-3 text-white rounded md:bg-transparent md:p-0"
                    aria-current="page"
                  >
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* <!-- HERO --> */}
        <article class="gradiente h-[100vh] text-white lg:flex">
          <section class="flex flex-col justify-center h-full ml-4 lg:ml-20">
            <h1 class="text-5xl lg:text-7xl font-bold">
              Sistema de control <br />
              de incidencias
            </h1>
            <p class="font-medium text-lg lg:text-xl mt-6">
              Sistema dedicado para incidencias en equipos medicos para empresas
              <br />
              chicas y medianas.
            </p>
            <button
              type="button"
              class="w-fit mt-4 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
            >
              Leer mas
            </button>
          </section>
          <div className="hidden lg:flex justify-center items-center">
            <img src="./image.png" alt="panel-incidencias" className="w-[90%] "/>
          </div>
        </article>

        {/* <!-- SOBRE SISTEMA --> */}
        <article class="lg:h-[100vh] pl-4 pt-10 lg:pt-20 lg:pl-20 lg:w-1/2 relative">
          <section>
            <h2 class="text-5xl lg:text-7xl font-bold">
              Lorem ipsum <br />
              dolor sit <br />
              amet consectetur
            </h2>
            <p class="text-2xl lg:text-3xl font-medium mt-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed,
              <br />
              asperiores repellendus atque voluptas, commodi laborum totam quo
              <br />
              rerum optio recusandae aliquam blanditiis unde architecto enim
              <br />
              veniam repudiandae deleniti nostrum explicabo!
            </p>
          </section>
        </article>

        {/* <!-- SHAPE --> */}
        <article class="relative mt-[10rem]">
          <div class="custom-shape-divider-bottom-1722318992">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M1200 0L0 0 892.25 114.72 1200 0z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
        </article>

        {/* <!-- SERVICIOS --> */}

        <article class="h-[100vh] bg-[#004e92]">
          <section class="p-4 lg:p-10">
            <header class="text-white mt-10">
              <h2 class="text-5xl font-extrabold">Servicios</h2>
            </header>
          </section>
        </article>

        {/* <!-- ABOUT US --> */}
        <article class="h-[100vh] bg-[#004e92]">
          <section class="p-4 lg:p-10">
            <header class="text-white mt-10">
              <h2 class="text-5xl font-extrabold">¿Quienes somos?</h2>
            </header>
          </section>
        </article>

        {/* <!-- TESTIMONIOS --> */}
        <article class="bg-[#004e92]">
          <section class="text-white">
            <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
              <figure class="max-w-screen-md mx-auto">
                <svg
                  class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                  viewBox="0 0 24 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote>
                  <p class="lg:text-2xl font-medium text-gray-100 dark:text-white">
                    "Flowbite is just awesome. It contains tons of predesigned
                    components and pages starting from login screen to complex
                    dashboard. Perfect choice for your next SaaS application."
                  </p>
                </blockquote>
                <figcaption class="flex items-center justify-center mt-6 space-x-3">
                  <img
                    class="w-6 h-6 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                    alt="profile picture"
                  />
                  <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div class="pr-3 font-medium text-gray-300 dark:text-white">
                      Micheal Gough
                    </div>
                    <div class="pl-3 text-sm font-light text-gray-100 dark:text-gray-400">
                      CEO at Google
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
        </article>

        {/* <!-- SHAPE --> */}
        <article class="relative ">
          <div class="custom-shape-divider-top-1722320114">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M1200 0L0 0 598.97 114.72 1200 0z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
        </article>
      </main>
    </>
  );
}
