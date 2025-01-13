import './App.css'
import Filters from './components/Filters'
import Footer from './components/Footer'
import Header from './components/Header'
import Items from './components/Items'
import NewestSlider from './components/NewestSlider'
import Slider from './components/Slider'

function App() {

  return (
    <div>
      
      <Header/>

      <div className='flex flex-col gap-3 text-green-950 px-20 py-5'>

          <Slider/>

          <Filters/>

          <Items/>

          <NewestSlider/>

      </div>


      <Footer/>

    </div>
  )
}

export default App
