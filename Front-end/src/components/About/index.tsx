import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function About() {
    const settings: Settings = {
        dots: true,
        lazyLoad: "ondemand",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-10">
            <Slider {...settings}>
                <div className="!w-full">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full">
                        <div className="text-left md:w-1/2 w-full space-y-6">
                            <h1 className="text-4xl font-bold text-primary">Sou João Carlos</h1>
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                Desenvolvedor Full-Stack com paixão por transformar ideias em código.
                            </p>
                            <button className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary-dark transition duration-300">
                                Contate-me
                            </button>
                        </div>

                        <div className="md:w-1/2 w-full flex justify-center">
                            <img
                                src="/logodark.png"
                                alt="João Carlos"
                                className="w-72 h-72 object-contain rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>

                <div className="!w-full">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full">
                        <div className="text-left md:w-1/2 w-full space-y-6">
                            <h1 className="text-4xl font-bold text-primary">Sou João Carlos</h1>
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                Desenvolvedor Full-Stack com paixão por transformar ideias em código.
                            </p>
                            <button className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary-dark transition duration-300">
                                Contate-me
                            </button>
                        </div>

                        <div className="md:w-1/2 w-full flex justify-center">
                            <img
                                src="/logodark.png"
                                alt="João Carlos"
                                className="w-72 h-72 object-contain rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default About;
