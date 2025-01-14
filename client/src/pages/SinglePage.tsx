import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SinglePageDetail from '../components/SinglePageDetail'
import SinglePageSlider from '../components/SinglePageSlider'
import Slider from '../components/Slider'

function SinglePage() {

  return (
    <div> 
      <Header/>
      <div className='flex flex-col gap-3 text-green-950 px-20 py-5'>
        <Slider/>
        <div className='flex justify-end mx-10'>
          <BackButton />
        </div>
        <div className="flex flex-col gap-8 px-20 py-5 mt-10 text-green-950">
          <div className="grid grid-cols-2 gap-10">

            <div className="flex-1">

              <div className="mb-5">
                <img
                  src="https://i.ebayimg.com/images/g/WkUAAOSwz1peLypM/s-l1600.webp"
                  alt="Product"
                  className=" w-full h-96 object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="flex gap-3">
                <SinglePageSlider/>
              </div>
            </div>

            <div className="flex-1 max-w-md">
            
              <SinglePageDetail/>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default SinglePage
