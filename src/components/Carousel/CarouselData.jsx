import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import banner2 from '../../assets/images/banner1.png'
import banner1 from '../../assets/images/banner2.png'
import banner3 from '../../assets/images/banner3.png'
import './carousel.css'

function CarouselData() {

    const responsive = {
        0: { items: 1 },
        568: { items: 1 },
        1024: { items: 1 },
    };
    const handleDragStart = (e) => e.preventDefault();
    const items = [
        <div data-value="1">
            <img onDragStart={handleDragStart} className='w-full lg:h-[400px] md:h-[300px] h-[250px] ' src={banner1} alt="" />
        </div>,
        <div data-value="2"><img onDragStart={handleDragStart} className='w-full lg:h-[400px] md:h-[300px] h-[250px]' src={banner2} alt="" /></div>,
        <div data-value="3"><img onDragStart={handleDragStart} className='w-full lg:h-[400px] md:h-[300px] h-[250px]' src={banner3} alt="" /></div>,
        // <div className="" data-value="4"><img onDragStart={handleDragStart} className='w-full lg:h-[400px] md:h-[300px] h-[250px]' src="https://cdn.pixabay.com/photo/2023/02/09/16/36/bridge-7779222_960_720.jpg" alt="" /></div>,
        // <div className="" data-value="5"><img onDragStart={handleDragStart} className='w-full lg:h-[400px] md:h-[300px] h-[250px]' src="https://cdn.pixabay.com/photo/2023/02/05/17/25/leaves-7770035__340.jpg" alt="" /></div>,
    ];


    return (
        <div className=' max-w-[1200px] mx-auto w-full rounded-3xl overflow-hidden'>

            <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
                controlsStrategy="alternate"
                animationDuration={1000}
                autoPlay={true}
                disableButtonsControls={true}
            />

        </div>
    )
}

export default CarouselData