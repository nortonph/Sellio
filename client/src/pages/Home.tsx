import Filters from '../components/Filters'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Items from '../components/Items'
import NewestSlider from '../components/NewestSlider'
import Slider from '../components/Slider'

function Home() {

  return (
    <div>
      
      <Header/>

      <div className='flex flex-col gap-3  px-20 py-5'>

          <Slider/>

          <Filters/>

          <h1 className='font-bold mt-10'>Second-hand Stuff for You!</h1>
          <Items/>

          <NewestSlider/>

      </div>


      <Footer/>

    </div>
  )
}

export default Home